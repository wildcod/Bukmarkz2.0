import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import style from "./Footer.module.scss";
import forwardIcon from "../../../assets/img/forward.svg";
import locationIcon from "../../../assets/img/location.svg";
import phoneIcon from "../../../assets/img/phone.svg";
import sendIcon from "../../../assets/img/send.svg";
import { Link } from "react-router-dom";

const Footer = () => {

  const [formContact, setFormContact] = useState({
    email: "",
    topic: "",
    message: "",
  })

  function createContactMessage(event) {
    event.preventDefault();
    console.log(formContact.email);
    axios({
      method: "POST",
      url:"/send/contact-email/",
      data:{
        email: formContact.email,
        topic: formContact.topic,
        message: formContact.message
      }
    })
    .then((response) => {
      setFormContact(({
        email: "",
        topic: "",
        message: ""}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        }
    })
  }

  function handleChange(event) { 
    const {value, name} = event.target
    setFormContact(prevContact => ({
        ...prevContact, [name]: value})
  )}

  return (
    <footer className={style.footerWrapper}>
      <div className={style.innerContainer}>
        <div className={style.about}>
          <h3>About Company</h3>
          <p>
            In Bukmarkz we aspire to improve online productive by providing
            long-lasting online bookmark service to businesses, teams and to
            single entity
          </p>
        </div>
        <div className={style.blogPosts}>
          <h3>Recent posts</h3>
          <ul>
            {POSTS.map((post) => (
              <li key={post.title}>
                <img
                  width={20}
                  height={20}
                  src={forwardIcon}
                  alt={"forward-icon"}
                />
                <a href={"/"}>
                  <span>
                    {post.title}
                    {/*- <span className={style.date}>{post.date}</span>*/}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.tags}>
          <h3>Popular tags</h3>
          <div className={style.list}>
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className={style.contact}>
          <h3>Contact</h3>
          
          <form>
            <div className={style.inputGroup}>
                <input
                name="topic"
                type="text"
                placeholder="Topic"
                text={formContact.topic}
                onChange={handleChange}
                className={style.contactInput}
                value={formContact.topic}
                />
            </div>
            <div className={style.inputGroup}>
                <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                text={formContact.email}
                className={style.contactInput}
                value={formContact.email}
                />
            </div>

            <div className={style.inputGroup}>
                <textarea
                name="message"
                placeholder="Message..."
                onChange={handleChange}
                className={style.contactInput}
                value={formContact.message}
                ></textarea>
            </div>

            <button onClick={createContactMessage}>Submit</button>
          </form>

          {/* {
                      contact.map(c => (
                          <div key={c} className={style.item}>
                              <img src={c.icon} alt={'icon'} width={18} height={18}/>
                              <span>{c.text}</span>
                          </div>
                      ))
                  } */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const POSTS = [
  {
    title: "How to make Bookmarks",
    date: "Yesterday",
  },
  {
    title: "How to delete Bookmarks on mac",
    date: "Today",
  },
  // {
  //     title: 'How to export-bookmarks Firefox Bookmarks',
  //     date: '5 Hours Ago'
  // },
  {
    title: "How to export-bookmarks Safari Bookmarks",
    date: "5 Hours Ago",
  },
  {
    title: "How to make your own Bookmarks",
    date: "26.03.2019",
  },
];

const tags = [
  "bookmark-organize",
  "bookmark-server",
  "bookmark-manager",
  "online-bookmarks",
  "links-collector",
  // 'bookmarking-service'
];

const contact = [
  // {
  //     text: '795 South Park Avenue, Door 6 Wonderland, CA 94107, Australia',
  //     icon: locationIcon
  // },
  // {
  //     text: '+440 875369208 - Office',
  //     icon : phoneIcon
  // },
  {
    text: "support@bukmarz.com",
    icon: sendIcon,
  },
];
