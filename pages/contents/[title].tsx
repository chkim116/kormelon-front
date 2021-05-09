import React, { useCallback, useContext, useEffect, useState } from "react"
import styled from "@emotion/styled"
import ContentForm from "../../components/layouts/ContentForm"
import { Button, Modal, notification } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import AppContents from "../../components/layouts/AppContents"
import AppSider from "../../components/layouts/AppSider"
import axios from "axios"
import { Categories } from "../[categories]"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import { Post } from ".."
import { AppContext } from "../_app"
import { getCate, postDeleteFetcher } from "../../fetch"
import { useRouter } from "next/router"
import AppLoading from "../../components/layouts/AppLoading"
import AppEmpty from "../../components/layouts/AppEmpty"
import { NextSeo } from "next-seo"
import { useReplace } from "@cooksmelon/utils"

const Content = styled.section`
    width: 100%;
`

const ContentEditBtn = styled.div`
    margin-left: auto;
    width: 120px;
`

interface Props {
    post: Post
}

const Contents = ({ post }: Props) => {
    const [categories, setCategories] = useState<Categories[]>()
    const [loading, setLoading] = useState(false)
    const {
        showSider,
        user: { admin },
    } = useContext(AppContext)

    const router = useRouter()

    const handleEdit = useCallback(() => {
        router.push(`/upload?title=${post?.title}&edit=true`)
    }, [post, router])

    const handleDelete = useCallback(() => {
        Modal.confirm({
            title: "삭제여부",
            content: "게시글을 삭제합니다?",
            onOk: () =>
                postDeleteFetcher(post._id, post.category).then(() => {
                    setLoading(() => true)
                    notification.success({
                        message: "삭제는 됐는데, 반영 됐어요?",
                        placement: "bottomLeft",
                    })
                    router.push(`/${post.category}`)
                }),
        })
    }, [post, router])

    useEffect(() => {
        if (categories) {
            return
        }

        if (showSider) {
            getCate().then((res) => setCategories(res.data))
        }
    }, [showSider])

    if (loading) {
        return <AppLoading />
    }

    if (router.isFallback) {
        return <AppLoading text={true} />
    }

    if (!post) {
        return <AppEmpty />
    }

    // TODO: 에딧, 삭제 등은 고유 아이디로 이동~
    return (
        <>
            <NextSeo
                title={`${post.title}`}
                description={`${post.preview}`}
                canonical="https://www.kormelon.cf/"
                openGraph={{
                    title: `${post.title}`,
                    description: `${post.preview}`,
                    type: "article",
                    locale: "ko_KR",
                    url: `https://www.kormelon.cf/contents/${post.title}`,
                    site_name: "생각창고",
                }}
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
            <AppContents>
                <>
                    <Content>
                        {admin && (
                            <ContentEditBtn>
                                <Button
                                    type="link"
                                    size="large"
                                    onClick={handleEdit}
                                >
                                    <EditOutlined />
                                </Button>
                                <Button
                                    type="link"
                                    size="large"
                                    onClick={handleDelete}
                                >
                                    <DeleteOutlined />
                                </Button>
                            </ContentEditBtn>
                        )}
                        <ContentForm
                            tags={post.tags}
                            date={post.createDate}
                            title={post.title}
                            p={post.description}
                        />
                    </Content>
                    {categories && showSider && (
                        <AppSider categories={categories} />
                    )}
                </>
            </AppContents>
        </>
    )
}

export default Contents

interface AllTitles {
    title: string
}

export const getStaticPaths: GetStaticPaths<{
    title: string
}> = async () => {
    const allTitles: AllTitles[] = await axios
        .get("/post/all")
        .then((res) => res.data.postTitleList)

    const title = allTitles.map((list) => ({ ...list }))

    const paths = title.map((list) => {
        return { params: { title: list.title } }
    })

    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (
    ctx: GetStaticPropsContext
) => {
    const { params } = ctx

    const post = await axios
        .get(`/post/${encodeURIComponent(params?.title as string)}`)
        .then((res) => res.data)

    return { props: { post }, revalidate: 1 }
}
