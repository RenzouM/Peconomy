// Función para formatear el conteo de seguidores con K o M
export const formatFollowers = (followers: number): string => {
  if (followers >= 1000000) {
    return (followers / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (followers >= 1000) {
    return (followers / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return followers.toString();
};

// Función para ordenar enlaces sociales por número de seguidores
export const sortSocialLinksByFollowers = <T extends { followers: number }>(links: T[]): T[] => {
  return [...links].sort((a, b) => b.followers - a.followers);
};
