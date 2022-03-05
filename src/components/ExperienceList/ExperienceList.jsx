import { Tooltip, Typography } from '@mui/material'
import { motion, useMotionValue, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom';
import { items } from '../../utils/jobs'
import '../../styles/styles.css'
import { useRef, useState, useEffect } from 'react';
import './styles.scss'
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const wrapperVariants = {
    initial: {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
        transition: { duration: .4 }
    },
    animate: {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition: { duration: .4, staggerChildren: .1 }
    },
    exit: {
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        transition: { duration: .4 }
    }
}
const squareVariants = {
    initial: {
        opacity: 0,
        scale: .3,
    },
    animate: {
        opacity: 1,
        scale: 1,
    }
}

const bounceTransition = {
    y: {
        duration: 0.4,
        yoyo: Infinity,
        ease: "easeOut"
    },
    backgroundColor: {
        duration: 0,
        yoyo: Infinity,
        ease: "easeOut",
        repeatDelay: 0.8
    }
};


export default function ExperienceList() {
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const squares = ['yellow', 'green', 'blue', 'violet'];
    const renderSquares = () => {

        return squares.map((color, i) => (
            <Tooltip title="Don't just hover! Click me!">
                <motion.div
                    key={i}
                    className={`square square--${color}`}
                    onClick={() => { setSelectedSquare(color) }}
                    variants={squareVariants}
                    transition={{ duration: .2, type: 'spring' }}>
                </motion.div>
            </Tooltip>
        ))

    }

    useEffect(() => {
        let i = squares.findIndex(color => color === selectedSquare);
        if (i !== -1) {
            if (i === 0) {
                setSelectedIndex(i++)
            }
            else {
                setSelectedIndex(i)
            }
        }
    }, [selectedSquare])
    return (
        <div className={`cp-transition cp-transition__container cp-transition__container--${selectedSquare}`}>
            {selectedSquare ? (
                <motion.div
                    className={`card card__wrapper card__wrapper--${selectedSquare}`}
                    variants={wrapperVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <div className="card__header">
                        <div className='header_title'>
                            <h2>{items[selectedIndex].title}</h2>
                            <h4>{items[selectedIndex].occupation}</h4>
                        </div>
                        <button onClick={() => { setSelectedSquare(null); setSelectedIndex(1) }}>
                            <CloseIcon fontSize='large' />
                        </button>
                    </div>
                    <div className="card__content">
                        <div className="card__img-placeholder" style={{ backgroundImage: `url('images/${selectedIndex + 1}.jpg')` }} />
                        <div className="card__text-placeholder">
                            {items[selectedIndex].description}
                        </div>
                    </div>
                </motion.div>
            ) : (
                <div className='cp-transition__squares'>
                    <h2>My experiences</h2>
                    <h5>Click the boxes</h5>
                    <div style={{
                        width: "2rem",
                        height: "2rem",
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: '60px'
                    }}>

                        <motion.span
                            transition={bounceTransition}
                            animate={{
                                y: ["100%", "-100%"],
                                backgroundColor: "transparent"
                            }}
                        ><KeyboardArrowDownIcon /></motion.span>
                    </div>
                    <motion.div
                        className="cp-transition__squares-wrapper"
                        key="squares"
                        variants={wrapperVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {renderSquares()}
                    </motion.div>
                </div>
            )}
        </div>
    )
}