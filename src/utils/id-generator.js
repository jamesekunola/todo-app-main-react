function* idGenerator() {
  let id = 0;

  while (true) {
    id++;
    yield id;
  }
}

export const generateId = idGenerator();
