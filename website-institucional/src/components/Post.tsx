type Postprops = {
    text: string
}

function Post(props: Postprops) {
    return (
        <p>{props.text}</p>
    )
}

export default Post;