import type {
  EnrollmentRequest,
  EnrollmentRequestInput,
  EnrollmentStatus,
} from '../types';

const ENROLLMENT_STORAGE_KEY = 'educar_enrollment_requests';

function readRequests() {
  const raw = localStorage.getItem(ENROLLMENT_STORAGE_KEY);

  if (!raw) {
    return [] as EnrollmentRequest[];
  }

  try {
    return JSON.parse(raw) as EnrollmentRequest[];
  } catch {
    return [] as EnrollmentRequest[];
  }
}

function writeRequests(requests: EnrollmentRequest[]) {
  localStorage.setItem(ENROLLMENT_STORAGE_KEY, JSON.stringify(requests));
}

export function listEnrollmentRequests() {
  return readRequests().sort((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  );
}

export function createEnrollmentRequest(input: EnrollmentRequestInput) {
  const requests = readRequests();
  const duplicatedPending = requests.find(
    (item) =>
      item.studentDni === input.studentDni &&
      item.status !== 'archived' &&
      item.status !== 'contacted',
  );

  if (duplicatedPending) {
    throw new Error(
      'Ya existe una solicitud activa para este DNI. Revisala desde el panel institucional.',
    );
  }

  const request: EnrollmentRequest = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    source: 'public-form',
  };

  writeRequests([request, ...requests]);
  return request;
}

export function updateEnrollmentStatus(
  id: string,
  status: EnrollmentStatus,
) {
  const updated = readRequests().map((item) =>
    item.id === id ? { ...item, status } : item,
  );

  writeRequests(updated);
  return updated.find((item) => item.id === id) ?? null;
}

export function getEnrollmentStatusCount(status: EnrollmentStatus) {
  return readRequests().filter((item) => item.status === status).length;
}
