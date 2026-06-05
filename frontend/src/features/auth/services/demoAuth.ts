import { forumStore } from '../../comunidad/services/forumStore';
import { institutionalStudents } from '../data/institutionalStudents';
import { localDemoAccounts } from '../data/localDemoAccounts';
import type {
  AuthSession,
  DemoUserRole,
  InstitutionalStudent,
  LocalDemoAccount,
  LoginResponse,
  StudentCreationPayload,
} from '../types';

const AUTH_SESSION_KEY = 'educar_auth_session';
const ACCOUNT_STATUS_KEY = 'educar_demo_student_accounts';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const ADMIN_EMAIL = 'director@educar.com';

type AccountStatusMap = Record<string, boolean>;

function getEndpoint(path: string) {
  return `${API_BASE_URL}${path}`;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function formatNameFromEmail(email: string) {
  const [localPart] = email.split('@');
  return localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');
}

function readAccountStatus(): AccountStatusMap {
  const raw = localStorage.getItem(ACCOUNT_STATUS_KEY);

  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as AccountStatusMap;
  } catch {
    return {};
  }
}

function writeAccountStatus(status: AccountStatusMap) {
  localStorage.setItem(ACCOUNT_STATUS_KEY, JSON.stringify(status));
}

function inferBackendRole(email: string): DemoUserRole | null {
  const student = institutionalStudents.find(
    (item) => item.email.toLowerCase() === email,
  );

  if (student) {
    return 'student';
  }

  return 'authority';
}

function findLocalDemoAccount(email: string): LocalDemoAccount | null {
  const account = localDemoAccounts.find(
    (item) => item.email.toLowerCase() === email,
  );

  return account ?? null;
}

function getDisplayName(email: string) {
  if (email === ADMIN_EMAIL) {
    return 'Director Demo';
  }

  const localAccount = findLocalDemoAccount(email);

  if (localAccount) {
    return localAccount.name;
  }

  const student = institutionalStudents.find(
    (item) => item.email.toLowerCase() === email,
  );

  return student ? `${student.firstName} ${student.lastName}` : formatNameFromEmail(email);
}

function syncForumProfile(student: InstitutionalStudent) {
  forumStore.updateProfile({
    name: `${student.firstName} ${student.lastName}`,
    role: `${student.educationalLevel} • ${student.schoolYear} ${student.division}`,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    reputation: 32,
    postsCount: 0,
    badgesCount: 1,
    badges: ['Nuevo'],
  });
}

export function getSession(): AuthSession | null {
  const raw = localStorage.getItem(AUTH_SESSION_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function saveSession(session: AuthSession) {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(AUTH_SESSION_KEY);
}

export function getLocalDemoAccounts() {
  return localDemoAccounts;
}

export function getLocalDemoAccountByEmail(email: string) {
  return findLocalDemoAccount(normalizeEmail(email));
}

export function isStudentAccountCreated(dni: string) {
  return Boolean(readAccountStatus()[dni]);
}

export function markStudentAccountCreated(dni: string) {
  const current = readAccountStatus();
  current[dni] = true;
  writeAccountStatus(current);
}

export function getInstitutionalStudentByDni(dni: string) {
  const student = institutionalStudents.find((item) => item.dni === dni);

  if (!student) {
    return null;
  }

  return {
    ...student,
    hasAccount: isStudentAccountCreated(student.dni),
  };
}

export async function loginWithEmail(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  const localAccount = findLocalDemoAccount(normalizedEmail);

  if (localAccount) {
    if (localAccount.password !== password) {
      throw new Error('Credenciales invalidas o servicio no disponible.');
    }

    const session: AuthSession = {
      token: `local-demo-${localAccount.role}-${btoa(localAccount.email)}`,
      role: localAccount.role,
      email: localAccount.email,
      name: localAccount.name,
      authSource: 'local',
    };

    saveSession(session);
    return session;
  }

  let response: Response;

  try {
    response = await fetch(getEndpoint('/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: normalizedEmail, password }),
    });
  } catch {
    throw new Error('No se pudo conectar con el servicio de autenticacion.');
  }

  if (!response.ok) {
    throw new Error('Credenciales invalidas o servicio no disponible.');
  }

  const data = (await response.json()) as LoginResponse;
  const role = inferBackendRole(normalizedEmail);

  if (!role) {
    throw new Error(
      'El usuario autentico, pero no forma parte del flujo habilitado para esta demo.',
    );
  }

  if (role === 'student') {
    const student = institutionalStudents.find(
      (item) => item.email.toLowerCase() === normalizedEmail,
    );

    if (student) {
      syncForumProfile(student);
    }
  }

  const session: AuthSession = {
    token: data.token,
    role,
    email: normalizedEmail,
    name: getDisplayName(normalizedEmail),
    authSource: 'backend',
  };

  saveSession(session);
  return session;
}

export async function createStudentAccount(
  token: string,
  payload: StudentCreationPayload,
) {
  const response = await fetch(getEndpoint('/students'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'No se pudo crear la cuenta del alumno.');
  }

  markStudentAccountCreated(payload.dni);
  return response.text();
}

export function getDefaultStudentPayload(
  student: InstitutionalStudent,
): StudentCreationPayload {
  return {
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    dni: student.dni,
    birthDate: student.birthDate,
    phoneNumbers: [],
    password: 'programacion2026',
    schoolYear: student.schoolYear,
    division: student.division,
    educationalLevel: student.educationalLevel,
  };
}

export function getRoleHomePath(role: DemoUserRole) {
  switch (role) {
    case 'authority':
      return '/privado/solicitudes';
    case 'teacher':
      return '/docentes';
    case 'parent':
      return '/familias';
    case 'student':
    default:
      return '/privado/foro';
  }
}

export function getRoleLabel(role: DemoUserRole) {
  switch (role) {
    case 'authority':
      return 'Autoridad';
    case 'teacher':
      return 'Docente';
    case 'parent':
      return 'Familia';
    case 'student':
    default:
      return 'Alumno';
  }
}

export function getRoleAreaLabel(role: DemoUserRole) {
  switch (role) {
    case 'authority':
      return 'Panel institucional';
    case 'teacher':
      return 'Portal docente';
    case 'parent':
      return 'Portal familias';
    case 'student':
    default:
      return 'Ir al foro';
  }
}
