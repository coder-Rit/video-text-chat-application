import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion"


const EmojiComp = (props: any) => {

    const smileysEmojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
        '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
        '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🫢',
        '🫣', '🤫', '🤔', '🫡', '🤐', '😐', '🤨', '😑', '😶', '🫥',
        '😶‍🌫️', '😏', '😒', '🙄', '😬', '😮‍💨', '🤥', '🫨', '😌',
        '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧'
    ];
    const heartEmojis = [
        '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔',
        '❤️‍🔥', '❤️‍🩹', '❤️‍🩹', '❤️🩷'
    ];
    const colorEmojis = [
        '🖤', '🤍', '🤎', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎'
    ];
    const weatherEmojis = [
        '🌞', '🌦️', '⛈️', '🌧️', '🌨️', '🌪️', '🌫️', '🌊'
    ];
    const foodEmojis = [
        '🍎', '🍇', '🍓', '🍒', '🍑', '🍍', '🍌', '🍋', '🍉', '🍈',
        '🍏', '🍐', '🍆', '🍅', '🌽', '🥕', '🌶️', '🥒', '🥑', '🍄'
    ];



    return (
        <motion.div className='emojiComp'
            initial={{ opacity: 0, x: 250 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: .2,
              }}
        >
            <span className="RemoveCircleOutlineIcon" onClick={() => props.setEmojiPiker(false)}>
                <CloseIcon></CloseIcon>
            </span >
            <div className='emojiTable' id='emojiTable'>
                <div className='emDiv'>
                    {
                        smileysEmojis.map(em => <span className='em' onClick={() => props.setText(props.text + em)}> {em} </span>)
                    }
                </div>
                <div className='emDiv'>
                    {
                        heartEmojis.map(em => <span className='em' onClick={() => props.setText(props.text + em)}>  {em} </span>)
                    }
                </div>
                <div className='emDiv'>
                    {
                        colorEmojis.map(em => <span className='em' onClick={() => props.setText(props.text + em)}>  {em} </span>)
                    }
                </div>
                <div className='emDiv'>
                    {
                        foodEmojis.map(em => <span className='em' onClick={() => props.setText(props.text + em)}>  {em} </span>)
                    }
                </div>


            </div>

        </motion.div>
    )
}

export default EmojiComp