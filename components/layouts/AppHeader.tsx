import React, { useCallback, useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Header } from "antd/lib/layout/layout"
import { CloseOutlined, MenuOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"

const App = styled(Header)<{ scaleheight: string }>`
    position: fixed;
    width: 100%;
    background-color: #ffffff;
    height: ${({ scaleheight }) => (scaleheight === "true" ? "65px" : "55px")};
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    align-items: center;
    font-size: 1.125rem;
    z-index: 300;
    justify-content: space-between;
    transition: all 200ms;

    @media all and (max-width: 540px) {
        padding: 0;
        padding-left: 12px;
    }

    .header__container {
        max-width: 1000px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        span {
            cursor: pointer;
        }
    }

    .header__login {
        margin-right: 15px;
    }
    @media all and (max-width: 540px) {
        font-size: 14px;
    }
`

const NavBtn = styled(Button)`
    position: absolute;
    right: 20px;
    top: 10px;
    @media all and (max-width: 540px) {
        top: 70px;
    }
`

interface Props {
    handleLogout: () => void
    handleShowSider: () => void
    showSider?: boolean
}

const logoutFetcher = async (url: string) => {
    return await axios.post(url)
}

const AppHeader = ({ handleLogout, handleShowSider, showSider }: Props) => {
    const [scaleHeight, setScaleHeight] = useState(false)
    const router = useRouter()
    const [isToken, setIsToken] = useState(false)

    const handleLogOut = useCallback(() => {
        logoutFetcher("/auth/logout")
        handleLogout()
        localStorage.removeItem("token")
        setIsToken(false)
    }, [])

    //  유저확인
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsToken(true)
        } else {
            setIsToken(false)
        }
    }, [router])

    useEffect(() => {
        document.addEventListener("scroll", () => {
            if (window.scrollY > 75) {
                setScaleHeight(() => true)
            } else {
                setScaleHeight(() => false)
            }
        })

        return () => {
            document.removeEventListener("scoll", (_) => _)
        }
    }, [])

    return (
        <App scaleheight={scaleHeight.toString()}>
            <div className="header__container">
                <Link href="/">
                    <div>
                        <span>개발자의 생각창고</span>
                    </div>
                </Link>
                <div className="header__login">
                    {isToken ? (
                        <>
                            <Link href="/upload">
                                <Button type="link" size="middle">
                                    Upload
                                </Button>
                            </Link>
                            <Button
                                type="link"
                                size="middle"
                                onClick={handleLogOut}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button type="link" size="middle">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
                <NavBtn type="ghost" size="large" onClick={handleShowSider}>
                    {showSider ? <CloseOutlined /> : <MenuOutlined />}
                </NavBtn>
            </div>
        </App>
    )
}

export default AppHeader
