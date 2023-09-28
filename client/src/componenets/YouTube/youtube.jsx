import { useState, useEffect } from "react";

import "./youtube.css";

function Youtube() {
	const [YouTubeVideos, setYouTubeVideos] = useState([]);

	useEffect(() => {
		fetch(
			"https://youtube.googleapis.com/youtube/v3/search?part=snippet%2Cid&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=8&order=date&key=AIzaSyBpQ2KXEYD-DROir-c0FBf1Zy5Tjj86qBA"
		)
			.then((res) => res.json())
			.then((data) => {
				setYouTubeVideos(data.items);
			});
	}, []);

	return (
		<div>
			<div className="allVideosWrapper top-50">
				<div className="container-fluid">
					<div className="row h-100 align-items-center justify-content-center text-center">
						<div className="col-12">
							<div className="title-wraper bold video-title-wrapper">
								Latest Videos
							</div>
						</div>
						{YouTubeVideos?.map((singleVideo, i) => {
							let vidId = singleVideo.id.videoId;
							let vidLink = `https://www.youtube.com/watch?v=${vidId}`;
							let videoWrapper = (
								<div key={i} className="col-sm-12 col-md-6">
									<div className="singleVideoWrapper">
										<div className="videoThumbnail">
											<a
												href={vidLink}
												target="_blank"
												rel="noopener noreferrer"
											>
												<img
													src={singleVideo.snippet.thumbnails.high.url}
													alt={singleVideo.snippet.title}
												/>
											</a>
										</div>
										<div className="videoInfoWrapper">
											<div className="videoTitle">
												<a
													href={vidLink}
													target="_blank"
													rel="noopener noreferrer"
												>
													{singleVideo.snippet.title}
												</a>
											</div>
											<div className="videoDesc">
												{singleVideo.snippet.description}
											</div>
										</div>
									</div>
								</div>
							);
							return videoWrapper;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Youtube;
