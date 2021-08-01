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
import { API_HOST } from '../utils/constants';
import draftToHtml from 'draftjs-to-html';
import { Order } from './Order';
import { place_order } from '../utils/requests';



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
      padding: "0 1.6rem",
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
    },
    cardDesc: {
      padding: 0
    },
    priceOrder: {
      marginRight: "1rem"
    }
    // avatar: {
    //   backgroundColor: red[500],
    // },
  }));

export const Preview = ({ order, service }) => {
    const router = useRouter()
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [isOrder, setIsOrder] = React.useState(false);
    const placeOrder = () => {
      setIsOrder(true)
    }
    const exitOrder = () => {
      setIsOrder(false)

    }
    (order);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (<Card className={classes.root}>{!isOrder?
              <>
                  <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" src={order.user?.avatar&&order.user?.avatar.url?.length>0?API_HOST+order.user?.avatar?.url: `https://avatars.dicebear.com/api/avataaars/${order.user?.id}.svg`}>
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
                
                  <Carousel swiping autoPlay swipeable>
                    {order?.images?.length?
                      order.images.map((v, i) => {
                        return (
                          <div className="carousel__img" style={{backgroundImage: `url(${API_HOST + v.url})`, height: 300, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                          </div>
                        )
                      })
                    :
                        <div className="carousel__img" style={{backgroundImage: `url(http://beepeers.com/assets/images/commerces/default-image.jpg)`, height: 300, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                        </div>
                    }
                  </Carousel>
                  <CardContent className={classes.cardContent} disableSpacing>
                    <div className="order__preview">
                      <div className="order__preview--before">
                        <Rating className={classes.rating} name="read-only" value={order?.rating} readOnly disabled={order?.rating?true:false} precision={0.1} />
                        <Typography variant="body2" component="p">
                            {order?.orders} orders
                        </Typography>
                      </div>
                      <div className="order__preview--after">
                        {order?.currency?
                          <Typography className={classes.priceOrder} variant="h6">
                            {`${order?.price} ${order?.currency}`}
                          </Typography>
                        :
                        ""
                        }
                        <button onClick={placeOrder} className="btn__big btn_content">
                            <span className="btn__big--front">
                                {'Order'}
                            </span>
                        </button>
                      </div>
                    </div>

                    </CardContent>
                    <CardContent className={classes.cardDesc}>
                        <div className="card__desc--preview">
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
                        <div dangerouslySetInnerHTML={{__html: order?.detailsDesc?draftToHtml(JSON.parse(order.detailsDesc)):null}}></div>
                        </Typography>
                        </CardContent>
                    </Collapse>
                </>
                :
                <Order place_order={place_order} type={'products'} exitOrder={exitOrder} order={order} />
              }
            </Card>

    )
}