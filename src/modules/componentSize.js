/* Función para calcular el tamaño total y el número de componentes */
const componentSize = (components) => {
  if (!Array.isArray(components)) {
    console.error('Input is not an array of components.');
    return { totalSize: 0, componentCount: 0 };
  }

  if (components.length === 0) {
    return { totalSize: 0, componentCount: 0 }; // No hay componentes
  }

  // Inicializar el tamaño total y el número de componentes
  let totalSize = 0;
  let componentCount = 0;

  // Recorrer la lista de componentes y calcular el tamaño de cada uno
  components.forEach((component) => {
    if (typeof component === 'string') {
      const size = component.length;
      totalSize += size;
      componentCount++;
    }
  });

  // Retornar el tamaño total y el número de componentes
  return { totalSize, componentCount };
};
export default componentSize;
