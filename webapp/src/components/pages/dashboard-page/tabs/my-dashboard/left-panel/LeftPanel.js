import React, { useEffect, useState } from "react";
import s from "./LeftPanel.module.scss";
import Button from "../../../../../common/button/Button";
import UpArrow from "../../../../../../assets/img/up-arrow.svg";
import DownArrow from "../../../../../../assets/img/down-arrow.svg";
import Modal from "../../../../../common/Modal/Modal";
import SearchModal from "./search-modal/SearchModal";
import { connect } from "react-redux";
import {
  deleteRecommendation,
  getRecommendations,
} from "../../../../../../redux/reducers/recommendations";
import Recommendation from "./recommendation/Recommendation";
import { withTranslation } from "react-i18next";

const Card = ({ heading, hasSub, setAskOpenModal, children, t }) => {
  const [expanded, setExpanded] = useState(false);
  const [isShowMoreLink, setIsShowMoreLink] = useState(false);
  const [isExpandHistory, setIsExpandHistory] = useState(false);

  useEffect(() => {
    const element = document.getElementById(`ask-for-help`);
    setIsShowMoreLink(
      element?.scrollHeight > element?.clientHeight ||
        element?.scrollWidth > element?.clientWidth
    );
  }, []);

  const showMore = () => {
    setExpanded(true);
    setIsShowMoreLink(false);
  };

  return (
    <div className={s.cardContainer}>
      <h4>{heading}</h4>
      {hasSub ? (
        <div className={s.hasSub}>
          <p id={"ask-for-help"} className={expanded ? s.expand : ""}>
            {t("aids_card_description")}
          </p>
          {hasSub && isShowMoreLink ? (
            <a onClick={showMore}>Read More</a>
          ) : null}
          <div className={s.askBtn}>
            <Button
              onClick={() => setAskOpenModal(true)}
              label={t("ask_button")}
            />
          </div>
          <div className={s.historyContainer}>
            <h4>
              {t("aids_table_name")}
              <img
                src={isExpandHistory ? UpArrow : DownArrow}
                width={25}
                height={25}
                alt={"arrow"}
                onClick={() => setIsExpandHistory(!isExpandHistory)}
              />
            </h4>
            <div
              className={`${s.body} ${isExpandHistory ? s.animation : ""}`}
            ></div>
          </div>
        </div>
      ) : (
        <div className={s.body}>{children}</div>
      )}
    </div>
  );
};

const LeftPanel = ({
  getRecommendations,
  recommendations,
  categories,
  deleteRecommendation,
  t,
}) => {
  const [askOpenModal, setAskOpenModal] = useState(false);

  console.log("REC", recommendations);

  useEffect(() => {
    getRecommendations();
  }, []);

  return (
    <div>
      <Card heading={t("recommendation_card_title")} hasSub={false}>
        <div className={s.recommendations}>
          <ul>
            {/* {recommendations?.map((recommendation, index) => (
              <Recommendation
                key={index}
                categories={categories}
                recommendation={recommendation}
                deleteRecommendation={deleteRecommendation}
              />
            ))} */}
          </ul>
        </div>
      </Card>
      <Card heading={t("archive_card_title")} hasSub={false}></Card>
      <Card
        heading={t("aids_card_title")}
        hasSub={true}
        setAskOpenModal={setAskOpenModal}
        t={t}
      />
      <Modal openModal={askOpenModal} onClose={() => setAskOpenModal(false)}>
        <SearchModal closeModal={() => setAskOpenModal(false)} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recommendations: state.recommendations?.recommendation,
});

export default connect(mapStateToProps, {
  getRecommendations,
  deleteRecommendation,
})(withTranslation()(LeftPanel));
