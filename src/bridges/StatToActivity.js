export const MemoStatToActivityListItem = stat => {
  return {
    ...stat,
    tags: stat.distributionGroups,
    subtitle: `To: ${stat.to}`,
    date: stat.creationDateTime
  };
};

export const MemoStatDetailToActivityDetail = statDetail => {
  return {
    ...statDetail,
    stat: statDetail.memoStat
  };
};

export const JumpStartStatToActivityListItem = stat => {
  return {
    ...stat,
    tags: stat.distributionGroups,
    date: stat.dateTime,
    description: stat.articles.map(item => `- ${item}`).join('\n')
  };
};

export const JumpStartStatDetailToActivityDetail = statDetail => {
  return {
    ...statDetail,
    stat: statDetail.jumpStartStat
  };
};
