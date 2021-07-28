import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';

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
    // avatar: {
    //   backgroundColor: red[500],
    // },
  }));

export const Preview = ({ order }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return <Card className={classes.root}>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe">
                            {order?.user?.username[0].toUpperCase()}
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="Enlarge order">
                            <SettingsOverscanIcon />
                        </IconButton>
                        }
                        title={order?.title}
                        subheader={() => {
                            const date = Date(order?.created_at);
                            return date.split(" ", 5).join(" " )
                        }}
                    />
                    {/* Carousel */}
                    <Carousel swiping autoPlay swipeable>
                        <img src={order?.image} />
                        <img src="/assets/website-builder-workplace-interior-3d-rendering.jpg" />
                    </Carousel>
                    <CardContent disableSpacing>
                        <Rating name="read-only" value={order?.rating} readOnly />
                        <Typography variant="caption" color="textSecondary" component="p">
                            {order?.orders} orders
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {order?.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <BookmarkBorderIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                        <ShareIcon />
                        </IconButton>
                        <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography paragraph>
                        {order?.detailsDesc}
                        </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
}