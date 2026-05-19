export const checkIsCorsError = (error: unknown): boolean => {
  const isFileProtocol = location.protocol === 'file:';
  const isFetchTypeError =
    error instanceof TypeError && String(error.message).includes('fetch');

  return isFileProtocol || isFetchTypeError;
};
