import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import Head from "next/head";
const MeetupDetails = (props) => {
  console.log(props);
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content="Add your own meetups" />
      </Head>
      <MeetupDetail props={props} />
    </>
  );
};

export async function getStaticProps(context) {
  const meetId = context.params.meetId;

  const client = await MongoClient.connect(
    "mongodb+srv://Sheynodeveloper7555:IuKzJypz9H8jmOKB@cluster0.ngfma5f.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollections = db.collection("meetups");

  const meetup = await meetupsCollections.findOne({
    _id: new ObjectId(meetId),
  }); // No need for new ObjectId()
  client.close();
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      },
    },
  };
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Sheynodeveloper7555:IuKzJypz9H8jmOKB@cluster0.ngfma5f.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollections = db.collection("meetups");

  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetId: meetup._id.toString(),
      },
    })),
  };
}

export default MeetupDetails;
