
interface ProfileImagePropsI {
    url: string,
    className: string,
    username: string
}
const ProfileImage = (props: ProfileImagePropsI) => {


    return <img src={props.url === "/" ? `https://api.multiavatar.com/${props.username}.png` : props.url} className={props.className} alt={props.username} loading="lazy"></img>

}

export default ProfileImage