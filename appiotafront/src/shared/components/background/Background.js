import React from 'react';
import './Background.css';

const Background = () => {
    return(
        <div className="video-background hidden-xs">
            <div className="video-foreground">
                <video width="100%" height="100%" title="Video" autoPlay="autoplay" loop muted>
                    <source src="./video/videohd.mp4" />
                </video>
            </div>
        </div>
    );
}

export default Background;