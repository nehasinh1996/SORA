export const getFiltersForCategory = (category, allProducts) => {
  if (!category || !Array.isArray(allProducts)) {
    return { concerns: [], treatment_type: [], ingredients: [] };
  }

  // Filter products belonging to the given category (case-insensitive)
  const categoryProducts = allProducts.filter(
    (product) => product.category?.toLowerCase() === category.toLowerCase()
  );

  return {
    concerns: [...new Set(categoryProducts.flatMap((product) => product.concerns || []))],
    treatment_type: [...new Set(categoryProducts.flatMap((product) => product.treatment_type || []))],
    ingredients: [...new Set(categoryProducts.flatMap((product) => product.ingredients || []))],
  };
};
