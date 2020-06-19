function _articleListToDescription(articles) {
  return articles.map(item => `- ${item}`).join('\n');
}

export const MemoStatToActivityListItem = stat => {
  return {
    ...stat,
    tags: stat.distributionGroups,
    subtitle: `To: ${stat.to}`,
    date: stat.creationDateTime
  };
};

export const MemoStatDetailToActivityDetail = statDetail => {
  if (!statDetail.memoStat) {
    return {};
  }

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
    description: _articleListToDescription(stat.articles)
  };
};

export const JumpStartStatDetailToActivityDetail = statDetail => {
  if (!statDetail.jumpStartStat) {
    return {};
  }

  try {
    statDetail.jumpStartStat.description = _articleListToDescription(statDetail.jumpStartStat.articles);
  } catch (error) {}

  return {
    ...statDetail,
    stat: statDetail.jumpStartStat
  };
};
