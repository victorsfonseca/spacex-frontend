import "./skeleton.component.css"

type SkeletonProps = {
    style?: React.CSSProperties
}
export function Skeleton({ style}: SkeletonProps){
    return (
    <div className="SkeletonBox" style={style}>
        <div className="SkeletonAnimationElement" />
    </div>)
}