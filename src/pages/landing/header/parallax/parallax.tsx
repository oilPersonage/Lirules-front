import { useDispatch, useSelector } from 'react-redux';

import { useParallax } from '@hooks/useParallax';
import Vimeo from '@u-wave/react-vimeo';
import cn from 'classnames';

import { landingActions, landingSelectors } from '@reducers/landing';

import { IParallaxItem, parallaxItems } from './parallaxItems';
import { ParallaxText } from './parallaxText';
import styles from './styles.scss';

export function Parallax() {
  const isMobile = window.innerWidth < 600;

  const { isStartAnimation, isHover, landingMouseRef } = useSelector(landingSelectors.landing);
  const dispatch = useDispatch();
  const { pos, mousePos } = useParallax({ landingMouseRef });
  const transformCursor = `translate(${mousePos[0]}px, ${mousePos[1]}px)`;

  function setTransformParallaxItem(item: IParallaxItem) {
    return `translate( ${pos[0] * item.aspect}px, ${pos[1] * item.aspect}px)`;
  }

  function setStartAnimation() {
    const overflow = document.getElementById('overflow');
    overflow?.classList.add('remove');

    setTimeout(() => {
      overflow?.classList.add('hide');
    }, 1000);
    dispatch(landingActions.startAnimation());
  }

  return (
    <div className={styles.Parallax__images}>
      <div className={styles.Parallax__cursor} style={{ transform: transformCursor }}>
        <span
          className={cn(styles.Parallax__cursorDot, {
            [styles.Parallax__cursorDot_active]: isHover,
          })}
        />
      </div>

      {parallaxItems.map((item, index) => (
        <div
          key={index}
          className={item.className}
          style={{ transform: setTransformParallaxItem(item) }}
        >
          {!isMobile && item.img && <img src={item.img} className={styles.Parallax__img} alt="" />}
          {isMobile && item.mobileImg && (
            <img src={item.mobileImg} className={styles.Parallax__img} alt="" />
          )}
          {item.text && <ParallaxText isStartAnimation={isStartAnimation} />}
          {item.video && (
            <div className={styles.Parallax__video}>
              <div className={styles.Parallax__videoWrapper}>
                <Vimeo
                  video={item.video}
                  showTitle={false}
                  showPortrait={false}
                  controls={false}
                  loop={true}
                  // onPlay={setStartAnimation}
                  onReady={setStartAnimation}
                  // autoplay
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
