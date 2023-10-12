import React from 'react'
import Event from '../HOme/Events.jpg'

const ABout = () => {
  return (
    <div>
      <h1>We are The Brand</h1>
      <p>
        <h3>Creative Ideas</h3>
        Creating a "Wow!" factor is an essential part of making a memorable
        event. We have a strong creative team providing ideas for your event and
        will work with you to achieve an unforgettable end result.
        <br />
        <img style={{ height: '16rem', width: '16rem' }} src={Event}></img>
        <h3>Save Time and Money</h3>
        <h5> Does this seems expensive?</h5>
        but we have a range of event equipment as well as regular contact with
        trusted suppliers, performers, venues and technicians. As a result we
        can get better deals on anything you may need, and probably get it more
        quickly.
        <br />
        {/* <img style={{ height: '16rem', width: '16rem' }} src={Event}></img> */}
        <h3>Access to Technology</h3>
        We will give you access to our arsenal of technology such as high
        quality sound systems, integrated lighting options and wide screen
        displays.
        <br />
        {/* <img style={{ height: '16rem', width: '16rem' }} src={Event}></img> */}
        <h3>Professional Event Delivery </h3>
        We will take care of all the organisation and tasks to deliver a
        successful event, allowing you to focus on the day and your guests. The
        true quality of the service will show if there is a problem. A good
        event management company will have contingencies in case plan A or B
        doesn’t work.
        <br />
        {/* <img style={{ height: '16rem', width: '16rem' }} src={Event}></img> */}
        <h3>Manage Risk</h3>
        We have a solid health and safety management plan, will secure any
        necessary permits or licensing and have experienced staff on-site who
        will know what to do if an incident occurs. Manage Your Budget Your
        budget will be managed by an experienced us. we understand the costs
        involved and be able to provide estimates on any extras or changes in
        the event format or scope.
        <br />
        {/* <img style={{ height: '16rem', width: '16rem' }} src={Event}></img> */}
      </p>
    </div>
  )
}

export default ABout
