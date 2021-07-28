import { Component } from "react";
import CardCarousel from "./CardCarousel";
import SearchBar from "./SearchBar";

const BEST_SERVICES = [
    { id: 1, title: 'التعليق الصوتي', desc: 'التعليق الصوتي التعليق الصوتي', image: '/assets/microphone-with-pop-filter-shock-mount-anti-vibration-note-stand-tripod-music-score-studio-production.jpg' },
    { id: 2,title: 'الجواد للمنتاج', desc: 'الجواد للمنتاج الجواد للمنتاج', image: '/assets/back-view-video-editor-using-computer.jpg' },
    { id: 3,title: 'الهندسة الصوتية', desc: 'الهندسة الصوتية الهندسة الصوتية', image: '/assets/website-builder-workplace-interior-3d-rendering.jpg' },
    { id: 4,title: 'التعليق الصوتي', desc: 'التعليق الصوتي التعليق الصوتي', image: '/assets/microphone-with-pop-filter-shock-mount-anti-vibration-note-stand-tripod-music-score-studio-production.jpg' },
    { id: 5,title: 'الجواد للمنتاج', desc: 'الجواد للمنتاج الجواد للمنتاج', image: '/assets/back-view-video-editor-using-computer.jpg' },
    { id: 6,title: 'الهندسة الصوتية', desc: 'الهندسة الصوتية الهندسة الصوتية', image: '/assets/website-builder-workplace-interior-3d-rendering.jpg' },
    { id: 7,title: 'التعليق الصوتي', desc: 'التعليق الصوتي التعليق الصوتي', image: '/assets/microphone-with-pop-filter-shock-mount-anti-vibration-note-stand-tripod-music-score-studio-production.jpg' },
    { id: 8,title: 'الجواد للمنتاج', desc: 'الجواد للمنتاج الجواد للمنتاج', image: '/assets/back-view-video-editor-using-computer.jpg' },
    { id: 9,title: 'الهندسة الصوتية', desc: 'الهندسة الصوتية الهندسة الصوتية', image: '/assets/website-builder-workplace-interior-3d-rendering.jpg' },
    { id: 10,title: 'التعليق الصوتي', desc: 'التعليق الصوتي التعليق الصوتي', image: '/assets/microphone-with-pop-filter-shock-mount-anti-vibration-note-stand-tripod-music-score-studio-production.jpg' },
    { id: 11,title: 'الجواد للمنتاج', desc: 'الجواد للمنتاج الجواد للمنتاج', image: '/assets/back-view-video-editor-using-computer.jpg' },
    { id: 12,title: 'الهندسة الصوتية', desc: 'الهندسة الصوتية الهندسة الصوتية', image: '/assets/website-builder-workplace-interior-3d-rendering.jpg' },
  ]

class ServicesList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    previewService = (id) => {
        BEST_PRODUCTS.map((v, i) => {
            if (id === v.id) {
                this.props.preview(v)
            }
        })
    }

    render () {
        return (
            <>
                <SearchBar placeholder={"... إبحث عن خدمة الآن"} />
                <div className="main-divider"></div>
                <CardCarousel preview={this.previewService} items={BEST_SERVICES} />
            </>
        )
    }
}

export default ServicesList;