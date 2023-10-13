import React from 'react'
import creative from './creative.jpg'
import money from './money.jpg'
import technology from './technology.jpg'
import styles from './AboutUs.module.scss'
import professional from './professional.jpg'
import risk from './risk.jpg'

const ABout = () => {
  return (
    <div className={styles.mainDiv}>
      <h1 className='d-flex justify-content-center'>We are The Brand</h1>
      <hr className='mb-5' />
      <div>
        <div className={styles.paragraphDiv}>
          <h3 c>Creative Ideas</h3>
          <p>
            Creating a "Wow!" factor is an essential part of making a memorable
            event. <br />
            We have a strong creative team providing ideas for your event and
            will work with you to achieve an unforgettable end result.
            <br />
            Creativity itself doesn’t care at all about results – the only thing
            it craves is the process. <br />
            Learn to love the process and let whatever happens next happen,
            without fussing too much about it.
          </p>
        </div>
        <div className={styles.Image}>
          <img
            style={{ height: '20rem', width: '20rem' }}
            src={creative}
            alt='creative ideas'
          ></img>
        </div>
        <div className={styles.paragraphDivRight}>
          <h3>Save Time and Money</h3>
          <h5> Does this seems expensive?</h5>
          but we have a range of event equipment as well as regular contact with
          trusted suppliers, performers, venues and technicians.
          <br /> As a result we can get better deals on anything you may need,
          and probably get it more quickly.
        </div>
        <div className={styles.imageRight} id={styles.Right}>
          <img style={{ height: '16rem', width: '16rem' }} src={money}></img>
        </div>

        <div className={styles.paragraphDivBottom}>
          <h3>Manage Risk</h3>
          We have a solid health and safety management plan, will secure any
          necessary permits <br /> have experienced staff on-site who will know
          what to do if an incident occurs.
          <br /> Manage Your Budget Your budget will be managed by an
          experienced us. <br />
        </div>
        <div className={styles.imageBottom}>
          <img style={{ height: '16rem', width: '16rem' }} src={risk}></img>
        </div>

        <div className={styles.paragraphDivLeft}>
          <h3>Professional Event Delivery </h3>
          We will take care of all the organisation and tasks to deliver a
          successful event, allowing you to focus on the day and your guests.
          <br />
          The true quality of the service will show if there is a problem.
          <br /> A good event management company will have contingencies in case
          plan A or B doesn’t work.
        </div>
        <div className={styles.imageLeft} id={styles.Left}>
          <img
            style={{ height: '16rem', width: '16rem' }}
            src={professional}
          ></img>
        </div>
      </div>
    </div>
  )
}

export default ABout
