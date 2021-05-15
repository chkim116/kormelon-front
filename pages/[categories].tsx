import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import ContentList from "../components/ContentList"
import { useRouter } from "next/router"
import AppContents from "../components/layouts/AppContents"
import { Post, AppTitle } from "."
import AppLoading from "../components/layouts/AppLoading"
import AppEmpty from "../components/layouts/AppEmpty"
import { useInfiniteScroll } from "../hooks"
import { NextSeo } from "next-seo"

interface Props {
    post: Post[]
    postCount: number
}

const pagePost = async (filter: string, page: number) => {
    return await axios.get(`/post?filter=${filter}&page=${page}`)
}

const Category = ({ post, postCount }: Props) => {
    const router = useRouter()
    const [postList, setPostList] = useState(post)
    const [isLoading, setIsLoading] = useState(false)
    const viewPort = useRef<any>(null)

    const data = {
        viewPort: viewPort.current,
        isLoading,
        limit: Math.ceil(postCount / 6),
    }
    const [lastElement, page] = useInfiniteScroll(data)
    const [categories, setCategories] = useState()

    useEffect(() => {
        ;(async () =>
            await axios
                .get("/category")
                .then((res) => setCategories(res.data)))()
    })

    useEffect(() => {
        if (page <= 1) return
        setIsLoading(true)
        pagePost(router.query.categories as string, page as number).then(
            (res) => {
                setPostList([...postList, ...res.data.post])
                setIsLoading(false)
            }
        )
    }, [page])

    if (router.isFallback) {
        return <AppLoading />
    }

    if (!post) {
        return <AppEmpty />
    }

    return (
        <>
            <NextSeo
                title="개발자의 생각창고"
                description={`${router.query.categories}에 대한 생각`}
                canonical="https://www.kormelon.com"
            />
            <AppTitle>{router.query?.categories}</AppTitle>
            <AppContents categories={categories}>
                <>
                    <ContentList
                        lastElement={lastElement}
                        viewPort={viewPort}
                        postList={post}
                    ></ContentList>
                    {isLoading && <AppLoading scroll={true} />}
                </>
            </AppContents>
        </>
    )
}

export default Category

export interface Categories {
    _id?: string
    category: string
    post: any[]
}

export const getStaticPaths: GetStaticPaths = async (): Promise<any> => {
    const categories: Categories[] = await axios
        .get("/category")
        .then((res) => res.data)
    const category = categories.map((list) => ({ ...list }))

    const paths = category.map((list) => ({
        params: { categories: list.category },
    }))
    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (
    ctx: GetStaticPropsContext
) => {
    const category = ctx.params?.categories

    const post: Props = await axios
        .get(`/post?filter=${encodeURI(category as string)}`)
        .then((res) => res.data)

    return {
        props: { post: post.post, postCount: post.postCount },
        revalidate: 1,
    }
}
