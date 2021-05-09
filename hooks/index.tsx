import { useCallback, useEffect, useState } from "react"

interface Props {
    viewPort: any
    isLoading: boolean
    limit: number
}

export const useInfiniteScroll = ({ viewPort, isLoading, limit }: Props) => {
    const [page, setPage] = useState(0)
    const lastElement = useCallback(
        (node) => {
            if (
                isLoading ||
                page >= limit ||
                viewPort === undefined ||
                node === null
            ) {
                return
            }

            viewPort = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    viewPort.disconnect()
                    setPage((prev) => prev + 1)
                }
            })
            if (node) {
                viewPort.observe(node)
            }
        },
        [isLoading, viewPort]
    )

    return [lastElement, page]
}

export const useScrollTop = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])
}
