import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';
import { useRouter } from 'next/router'

import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';



const useStyles = makeStyles((theme) => ({
    root: {
      width: 600,
      marginTop: 35,
      marginBottom: 20,
      [theme.breakpoints.down('xs')]: {
        marginTop: 60,
      }
    },
    rating: {
      fontSize: "2.3rem"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    cardContent: {
      paddingTop: 0,
    },
    carouselImage: {
      maxHeight: "30rem",
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
    svg: {
      width: "2em",
      height: "2em",
    },
    desc : {
      fontSize: "1.5rem"
    }
    // avatar: {
    //   backgroundColor: red[500],
    // },
  }));

export const Preview = ({ order, service }) => {
    const router = useRouter()
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    console.log(order);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return <Card className={classes.root}>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" src={order.user?.avatar&&order.user?.avatar.length>0?order.user?.avatar: `https://avatars.dicebear.com/api/avataaars/${order.user?.id}.svg`}>
                            {order?.user?.username.toUpperCase()}
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="Enlarge order">
                            <SettingsOverscanIcon className={classes.svg} onClick={() => router.push(`/${service}/${order.id}`)} />
                        </IconButton>
                        }
                        title={<div className="card__content"><h1 class="card__title" style={{ fontSize: "6em" }}>{order?.title}<div class="card__title-bar"></div></h1></div>}
                        subheader={() => {
                            const date = Date(order?.created_at);
                            return date.split(" ", 5).join(" " )
                        }}
                    />
                    {/* Carousel */}
                    <Carousel swiping  swipeable>
                        <div className="carousel__img" style={{backgroundImage: `url(${order?.image})`, height: 300, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                          
                        </div>
                        <div className="carousel__img" style={{backgroundImage: `url(${order?.image})`, height: 300, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                        </div>
                    </Carousel>
                    <CardContent className={classes.cardContent} disableSpacing>
                        <Rating className={classes.rating} name="read-only" value={order?.rating} readOnly precision={0.1} />
                        <Typography variant="body2" component="p">
                            {order?.orders} orders
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <div className="card__desc">
                          {order?.description}
                        </div>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <BookmarkBorderIcon className={classes.svg} />
                        </IconButton>
                        <IconButton aria-label="share">
                        <ShareIcon className={classes.svg} />
                        </IconButton>
                        <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon className={classes.svg} />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography className={classes.desc} paragraph>
                          {order?.detailsDesc}
                        </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
}