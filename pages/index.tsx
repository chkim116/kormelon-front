import { GetStaticProps } from "next"
import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import ContentList from "../components/ContentList"
import { Categories } from "./[categories]"
import Title from "antd/lib/typography/Title"
import AppContents from "../components/layouts/AppContents"
import styled from "@emotion/styled"
import { useInfiniteScroll } from "../hooks"
import AppLoading from "../components/layouts/AppLoading"
import { NextSeo } from "next-seo"

export const AppTitle = styled(Title)`
    margin: 95px 0;
    padding: 0.75em 0 1.5em 0;
    display: flex;
    align-items: center;
    color: #5f9ea0 !important;
    justify-content: center;
    border-bottom: 1px solid #dbdbdb;
`

export interface Post {
    _id: string
    title: string
    preview: string
    description: string
    createDate: string
    updated?: string
    creator?: string
    tags: string[]
    category: string
}

export interface Props {
    post: Post[]
    postCount: number
    categories: Categories[]
}

const pagePost = async (page: number) => {
    return await axios.get(`/post?page=${page}`)
}

export default function Home({ post, postCount, categories }: Props) {
    const [postList, setPostList] = useState<Post[]>(post)
    const [isLoading, setIsLoading] = useState(false)
    const viewPort = useRef<any>(null)
    const data = {
        viewPort: viewPort.current,
        isLoading,
        limit: Math.ceil(postCount / 6),
    }
    const [lastElement, page] = useInfiniteScroll(data)

    useEffect(() => {
        if (page <= 1) return
        setIsLoading(true)
        pagePost(page as number).then((res) => {
            setPostList([...postList, ...res.data.post])
            setIsLoading(false)
        })
    }, [page])

    return (
        <>
            <NextSeo
                title="개발자의 생각창고"
                description="개발자 김창회의 블로그"
                canonical="https://www.kormelon.cf"
            />
            <AppTitle>all</AppTitle>
            <AppContents categories={categories}>
                <>
                    <ContentList
                        viewPort={viewPort}
                        postList={postList}
                        lastElement={lastElement}
                    ></ContentList>
                    {isLoading && <AppLoading scroll={true} />}
                </>
            </AppContents>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const post: Props = await axios.get("/post").then((res) => res.data)
    const categories: Categories[] = await axios
        .get("/category")
        .then((res) => res.data)

    return {
        props: {
            post: post.post,
            postCount: post.postCount,
            categories,
        },
        revalidate: 1,
    }
}
