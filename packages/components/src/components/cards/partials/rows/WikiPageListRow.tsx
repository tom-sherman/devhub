import React from 'react'

import { GitHubPage } from '@devhub/core'
import { RenderItem, RowList } from './RowList'
import { WikiPageRow, WikiPageRowProps } from './WikiPageRow'

export interface WikiPageListRowProps
  extends Omit<WikiPageRowProps, 'showMoreItemsIndicator' | 'title' | 'url'> {
  maxHeight?: number
  pages: GitHubPage[]
}

export const WikiPageListRow = React.memo((props: WikiPageListRowProps) => {
  const renderItem: RenderItem<GitHubPage> = ({
    item: page,
    index,
    showMoreItemsIndicator,
  }) => {
    if (!(page && page.sha && page.title)) return null

    return (
      <WikiPageRow
        key={`page-row-${page.sha}`}
        {...props}
        showMoreItemsIndicator={showMoreItemsIndicator}
        title={page.title}
        url={page.html_url || page.url}
        withTopMargin={index === 0 ? props.withTopMargin : true}
      />
    )
  }

  const { pages, ...otherProps } = props

  if (!(pages && pages.length > 0)) return null

  return <RowList {...otherProps} data={pages} renderItem={renderItem} />
})
