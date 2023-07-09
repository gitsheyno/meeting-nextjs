import classes from "./MeetupDetail.module.css";

const MeetupDetail = ({ props }) => {
  console.log(props);
  const { meetupData } = props;

  return (
    <section className={classes.detail}>
      <img src={meetupData.image} alt="event pic" />
      <h1>{meetupData.title}</h1>
      <p>{meetupData.description}</p>
      <address>{meetupData.address}</address>
    </section>
  );
};

export default MeetupDetail;
