'use client';

import Giscus from '@giscus/react';

export default function GiscusComments() {
  return (
    <Giscus
      repo="jihyeonkimm/blog-giscus"
      repoId="R_kgDOQKcIIQ"
      category="Announcements"
      categoryId="DIC_kwDOQKcIIc4CxJw2"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="preferred_color_scheme"
      lang="ko"
      loading="lazy"
    />
  );
}
