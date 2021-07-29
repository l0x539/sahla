import { Component } from "react";
import CardCarousel from "./CardCarousel";
import SearchBar from "./SearchBar";

const BEST_SERVICES = [
    { id: 1, orders: 15, detailsDesc: "Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem Lorem Ipsem ", rating: 4.5, title: 'التعليق الصوتي', description: 'التعليق الصوتي التعليق الصوتي', image: '/assets/microphone-with-pop-filter-shock-mount-anti-vibration-note-stand-tripod-music-score-studio-production.jpg' },
    { id: 2, rating: 3.5,title: 'الجواد للمنتاج', description: 'الجواد للمنتاج الجواد للمنتاج', image: '/assets/back-view-video-editor-using-computer.jpg' },
    { id: 3, rating: 4.5,title: 'الهندسة الصوتية', description: 'الهندسة الصوتية الهندسة الصوتية', image: '/assets/website-builder-workplace-interior-3d-rendering.jpg' },
    { id: 4, rating: 4,title: 'التعليق الصوتي', description: 'التعليق الصوتي التعليق الصوتي', image: '/assets/microphone-with-pop-filter-shock-mount-anti-vibration-note-stand-tripod-music-score-studio-production.jpg' },
    { id: 5, rating: 2.5,title: 'الجواد للمنتاج', description: 'الجواد للمنتاج الجواد للمنتاج', image: '/assets/back-view-video-editor-using-computer.jpg' },
    { id: 6, rating: 4.5,title: 'الهندسة الصوتية', description: 'الهندسة الصوتية الهندسة الصوتية', image: '/assets/website-builder-workplace-interior-3d-rendering.jpg' },
    { id: 7, rating: 5,title: 'التعليق الصوتي', description: 'التعليق الصوتي التعليق الصوتي', image: '/assets/microphone-with-pop-filter-shock-mount-anti-vibration-note-stand-tripod-music-score-studio-production.jpg' },
    { id: 8, rating: 4.5,title: 'الجواد للمنتاج', description: 'الجواد للمنتاج الجواد للمنتاج', image: '/assets/back-view-video-editor-using-computer.jpg' },
    { id: 9, rating: 4.5,title: 'الهندسة الصوتية', description: 'الهندسة الصوتية الهندسة الصوتية', image: '/assets/website-builder-workplace-interior-3d-rendering.jpg' },
    { id: 10, rating: 3.3,title: 'التعليق الصوتي', description: 'التعليق الصوتي التعليق الصوتي', image: '/assets/microphone-with-pop-filter-shock-mount-anti-vibration-note-stand-tripod-music-score-studio-production.jpg' },
    { id: 11, rating: 4.9,title: 'الجواد للمنتاج', description: 'الجواد للمنتاج الجواد للمنتاج', image: '/assets/back-view-video-editor-using-computer.jpg' },
    { id: 12, rating: 4.8,title: 'الهندسة الصوتية', description: 'الهندسة الصوتية الهندسة الصوتية', image: '/assets/website-builder-workplace-interior-3d-rendering.jpg' },
  ]

class ServicesList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    previewService = (id) => {
        BEST_SERVICES.map((v, i) => {
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