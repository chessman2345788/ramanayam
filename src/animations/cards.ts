export const productCardAnimation = {
  transition: {
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1] as const,
  }
};

export const productCardAddToCartAnimation = {
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
  }
};

