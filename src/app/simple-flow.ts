import { GitgraphUserApi } from '@gitgraph/core';

const simpleFlow = (graph: GitgraphUserApi<any>) => {
  const main = graph.branch('main');

  const development = graph.branch('development');
  const zbp0001 = development.branch('feature/ZBP-0001');
  const zbp0002 = development.branch('feature/ZBP-0002');
  zbp0001.commit('ZBP-0001 Merge Request squashed');
  zbp0002.commit('ZBP-0002 Merge Request squashed');

  development.merge({ branch: zbp0002, fastForward: true });
  development.merge({ branch: zbp0001, fastForward: true });

  const release1 = development.branch('release/2021-09-01');
  const zbp0003 = release1.branch('bugfix/ZBP-0003');
  zbp0003.commit('ZBP-0003 Merge Request squashed');
  release1.merge({ branch: zbp0003, fastForward: true });

  const zbp0004 = development.branch('feature/ZBP-0004');
  zbp0004.commit('ZBP-0004: Merge Request squashed');
  development.merge({ branch: zbp0004, fastForward: true });

  main.merge(release1, 'Merges release/2021-09-01 into origin/main');
  development.merge(main);

  const zbp0005 = main.branch('hotfix/ZBP-0005');
  zbp0005.commit('ZBP-0005: Hot fix');
  main.merge(zbp0005, 'Merges hotfix/ZBP-0005 into origin/main');

  const zbp0006 = development.branch('feature/ZBP-0006');
  zbp0006.commit('ZBP-0006: Merge Request squashed');
  development.merge({ branch: zbp0006, fastForward: true });

  development.merge(main);

  // Here's the problem with branching from main.
  const zbp0007 = main.branch('hotfix/ZBP-0007');
  zbp0007.commit('ZBP-0007: Hot fix');
  main.merge(zbp0007, 'Merges hotfix/ZBP-0007 into origin/main');

  // Release 2 doesn't include zbp0007 hot fix.
  const release2 = development.branch('release/2021-09-10').commit();
  main.merge(release2, 'Merges release/2021-09-10 into origin/main');

  development.merge(main);

  return graph;
};

export default simpleFlow;
