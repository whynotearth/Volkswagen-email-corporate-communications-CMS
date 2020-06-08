export const MemoStatToActivity = stat => {
  return {
    ...stat,
    tags: stat.distributionGroups,
    subtitle: `To: ${stat.to}`,
    date: stat.creationDateTime
  };
};

export const JumpStartStatToActivity = stat => {
  console.log(stat);

  return {
    ...stat,
    tags: stat.distributionGroups,
    date: stat.dateTime,
    description: stat.articles.map(item => `- ${item}`).join('\n')
  };
};
