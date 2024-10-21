/* eslint-disable react/jsx-key */
import ArticleItem from '@/component/articles/ArticleItem';
import React from 'react'
import {Article} from '@prisma/client';
import type { Metadata } from "next";
import SearchArticleInput from '@/component/articles/SearchArticleInput';
import Pagination from '@/component/articles/Pagination';
import { getArticles } from '@/apiCalls/articleApiCalls';
import { ARTICLE_PRE_PAGE } from '@/utilies/constans';
import prisma from '@/utilies/db';
 

interface ArticlesPageProps {
  searchParams: {pageNumber: string}
}


const ArticlePage = async ({searchParams}: ArticlesPageProps) => {
  const {pageNumber} = searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  const count:number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PRE_PAGE); // 25/6=4.1 => 5

  return (
    <section className='container m-auto px-5 fix-height'>
      <SearchArticleInput/>
      <div className='flex items-center justify-center flex-wrap gap-7'>
      {articles.map(item => (
        <ArticleItem article={item} key={item.id} />
      ))}
      </div>
      <Pagination pages={pages} pageNumber={parseInt(pageNumber)} route="/articles"/>

    </section>
  )
}

export default ArticlePage

export const metadata: Metadata = {
  title: "Article page",
  description: "Articles About Programming",
};
