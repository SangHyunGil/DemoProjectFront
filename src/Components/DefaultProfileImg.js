const DefaultProfileImg = (props) => {
    let defaultImgUrl = "https://koner-bucket.s3.ap-northeast-2.amazonaws.com/profileImg/";
    props?.isRandom ? defaultImgUrl += `koryong${Math.floor(Math.random()*(8-1+1))+1}.jpg` : defaultImgUrl += "koryong1.jpg";
    return (
        <img src={defaultImgUrl} alt="default profile"/>
    )
};

export default DefaultProfileImg;