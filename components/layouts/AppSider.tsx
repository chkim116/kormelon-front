import React, { useCallback, useContext, useState } from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import Sider from "antd/lib/layout/Sider"
import Link from "next/link"
import { Categories } from "../../pages/[categories]"
import { DeleteOutlined, FileAddOutlined } from "@ant-design/icons"
import { Button, Input, Modal, notification } from "antd"
import { delCategory, postCategory } from "../../fetch"
import { AppContext } from "../../pages/_app"

const App = styled(Sider)<{ show?: string }>`
    background-color: #ffffff;
    padding: 1em;
    margin-top: 1em;

    ${({ show }) =>
        show === "true" &&
        css`
            position: fixed;
            right: 0;
            top: 0;
            margin-top: 90px;
        `}
    ul {
        li {
            cursor: pointer;
            font-size: 18px;
            list-style: none;
            line-height: 38px;
            color: #828282;
            @media all and (max-width: 540px) {
                font-size: 16px !important;
                line-height: 34px;
            }
            &:hover {
                text-decoration: underline;
            }
        }
    }

    @media all and (max-width: 540px) {
        ${({ show }) =>
            show === "true"
                ? css`
                      display: block;
                      position: fixed;
                      right: 0;
                      top: 0;
                      margin-top: 90px;
                  `
                : css`
                      display: none;
                  `};
    }
`

const ContentEditBtn = styled.div`
    margin-left: auto;
    width: 120px;
`

const getAllLength = (category: Categories[]): number => {
    let res = 0
    category.reduce((prev: number, cur: Categories) => {
        return (res = prev + cur.post.length)
    }, 0)

    return res
}

const AppSider = ({ categories = [] }: { categories: Categories[] }) => {
    const allPost = useState(getAllLength(categories) || 0)
    const {
        showSider,
        user: { admin },
    } = useContext(AppContext)
    const [category, setCategory] = useState("")
    const [add, setAdd] = useState(false)
    const [delCategories, setDelCategories] = useState(false)

    const handleShowingAdd = useCallback(() => {
        setAdd((prev) => !prev)
    }, [])

    const handleAddCategory = useCallback(() => {
        if (!category) {
            return notification.error({
                message: "제대로 입력해 주세요",
                placement: "bottomLeft",
            })
        }
        postCategory(`/category/create`, { category })
        notification.info({
            message: `${category}가 생성되었습니다. 새로고침하던가 하세요~.`,
            placement: "bottomLeft",
        })
        setCategory(() => "")
        setAdd((prev) => !prev)
    }, [category])

    const handleChangeCategory = useCallback((e: any) => {
        setCategory(() => e.target.value)
    }, [])

    const handleSelectForDel = useCallback((e: any) => {
        const { id, cate } = e.currentTarget.dataset
        Modal.confirm({
            title: "삭제 여부",
            content: `${cate} 삭제 하십니까?`,
            onOk: () => {
                delCategory(`/category/del/${id}`)
                notification.success({
                    message: `${cate} 제거 성공, 새로고침하면 아마 사라질걸요?!.`,
                })
            },
        })
    }, [])

    const handleDelete = useCallback(() => {
        setDelCategories((prev) => !prev)
    }, [])

    return (
        <>
            <App show={showSider?.toString()}>
                <ul>
                    <Link href="/">
                        <li>All ({allPost})</li>
                    </Link>
                    {categories.map((list) => (
                        <div key={list._id}>
                            {delCategories ? (
                                <li>
                                    <DeleteOutlined
                                        data-id={list._id}
                                        data-cate={list.category}
                                        onClick={handleSelectForDel}
                                        style={{
                                            marginRight: "3px",
                                            color: "red",
                                        }}
                                    ></DeleteOutlined>
                                    {list.category} ({list.post.length})
                                </li>
                            ) : (
                                <Link href={`/${list.category}`} key={list._id}>
                                    <li>
                                        {list.category} ({list.post.length})
                                    </li>
                                </Link>
                            )}
                        </div>
                    ))}
                </ul>
                {add && (
                    <div style={{ display: "flex" }}>
                        <Input
                            onChange={handleChangeCategory}
                            placeholder="새로 추가할 카테고리 입력"
                        />
                        <Button type="primary" onClick={handleAddCategory}>
                            확인
                        </Button>
                    </div>
                )}
                {admin && (
                    <ContentEditBtn>
                        <Button
                            type="link"
                            size="middle"
                            onClick={handleShowingAdd}
                        >
                            <FileAddOutlined />
                        </Button>
                        <Button
                            type="link"
                            size="middle"
                            onClick={handleDelete}
                        >
                            <DeleteOutlined />
                        </Button>
                    </ContentEditBtn>
                )}
            </App>
        </>
    )
}

export default AppSider
