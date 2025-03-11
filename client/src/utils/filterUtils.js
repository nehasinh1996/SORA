export const getFiltersForCategory = (category, allProducts) => {
      if (!category || !allProducts) return { concerns: [], treatment_type: [], ingredients: [] };
  
    //   const categoryProducts = allProducts.filter(product => product.category === category);
    const categoryProducts = allProducts.filter(product => product.category?.toLowerCase() === category.toLowerCase());
  
      return {
          CONCERNS: [...new Set(categoryProducts.flatMap(product => product.concerns || []))],
          TREATMENT_TYPE: [...new Set(categoryProducts.flatMap(product => product.treatment_type || []))],
          INGREDIENTS: [...new Set(categoryProducts.flatMap(product => product.ingredients || []))]
      };
  };
  