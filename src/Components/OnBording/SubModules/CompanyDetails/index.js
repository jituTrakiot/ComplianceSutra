import React, { useState, useEffect } from "react"
import "./style.css"
import { toast } from "react-toastify"
import { withRouter } from "react-router-dom"
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png"
import comtech from "../../../../assets/Images/CapmTech.png"
import secmark from "../../../../assets/Images/secmark.png"
import leftArrow from "../../../../assets/Icons/leftArrow.png"
import india from "../../../../assets/Icons/india.png"
import plusIcon from "../../../../assets/Icons/plusIcon2.png"
import plusIcon2 from "../../../../assets/Icons/plusIcon3.png"
import grayPlusIcon from "../../../../assets/Icons/grayPlusIcon.png"
import deleteIcon from "../../../../assets/Icons/deleteIcon.png"
import deleteBlack from "../../../../assets/Icons/deleteBlack.png"
import dropdownUser from "../../../../assets/Icons/dropdownUser.png"
import whiteDeleteIcon from "../../../../assets/Icons/whiteDeleteIcon.png"
import LicenseDrawer from "../ChooseLicenses"
import { Modal } from "react-responsive-modal"
import { isMobile } from "react-device-detect"
import { useDispatch, useSelector } from "react-redux"
import { actions as companyActions } from "../../redux/actions"
import SideBarInputControl from "../SideBarInputControl"
import api from "../../../../apiServices"
import MobileStepper from "../mobileStepper"
import Searchable from "react-searchable-dropdown"

function CompanyDetails({ history }) {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [companyInfo, setCompanyInfo] = useState([])
  const [showEdit, setshowEdit] = useState(true)
  const [fields, setFields] = useState([
    {
      companyName: "",
      entityID: "",
      EntityTypeID: "",
      companyType: "",
      category: "",
      countShow: false,
      liecenseCount: null,
      currentIndex: null,
      liecenseData: [],
      licenseIDgrp: "",
      selectedLiecenseIdArray: [],
      parentLicense: [],
    },
  ])
  const [errors, setErrors] = useState([
    {
      companyNameError: "",
      companyTypeError: "",
      categoryErr: "",
      countShow: false,
      liecenseCount: null,
      currentIndex: null,
      liecenseData: [],
    },
  ])
  const [visible, setVisible] = useState(false)
  const [liecenseData, setLiecenseData] = useState([])
  const [category, setCategory] = useState([])
  const [categoryo, setCategoryo] = useState([])
  const [companyTypeInfo, setCompanyTypeInfo] = useState([])
  const [companyTypeoInfo, setCompanyTypeoInfo] = useState([])
  const [curentRowInfo, setCurrntRowInfo] = useState([])
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(0)
  const [entityId, setEntityId] = useState([])
  const [isEditIndex, setIsEditIndex] = useState(undefined)
  const [companyData, setCompanyData] = useState("")
  const [categoryData, setCategoryData] = useState("")

  const certificateInfo =
    state && state.complianceOfficer && state.complianceOfficer.certificateInfo

  const companyType =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.companyInfo.companyLicenseData &&
    state.complianceOfficer.companyInfo.companyLicenseData[0] &&
    state.complianceOfficer.companyInfo.companyLicenseData[0][0] &&
    state.complianceOfficer.companyInfo.companyLicenseData[0][0].CompanyType

  const Licenses =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.companyInfo.companyLicenseData &&
    state.complianceOfficer.companyInfo.companyLicenseData[1] &&
    state.complianceOfficer.companyInfo.companyLicenseData[1][0] &&
    state.complianceOfficer.companyInfo.companyLicenseData[1][0].Licenses

  const Categories =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.companyInfo.companyLicenseData &&
    state.complianceOfficer.companyInfo.companyLicenseData[2] &&
    state.complianceOfficer.companyInfo.companyLicenseData[2][0] &&
    state.complianceOfficer.companyInfo.companyLicenseData[2][0].Categories

  const userID =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.data &&
    state.complianceOfficer.personalInfo.data[0][0] &&
    state.complianceOfficer.personalInfo.data[0][0] &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails[0] &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails[0].UserID

  const EntityID =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.data &&
    state.complianceOfficer.personalInfo.data[0][0] &&
    state.complianceOfficer.personalInfo.data[0][0] &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails[0] &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails[0].EntityID

  const companyName =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.companyName

  const _entityID =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.cerificateInfo &&
    state.complianceOfficer.cerificateInfo.table &&
    state.complianceOfficer.cerificateInfo.table &&
    state.complianceOfficer.cerificateInfo.table[0] &&
    state.complianceOfficer.cerificateInfo.table[0].entityID

  const entityID =
    state && state.complianceOfficer && state.complianceOfficer.entityInfo
  useEffect(() => {
    dispatch(companyActions.storeEnityIDwithCompaName([]))
    dispatch(
      companyActions.companyTypeRequest({
        country: "INDIA",
        category: "",
        eid: "",
      })
    )
    let list = [...fields]
    list[0].companyName = companyName
  }, [])

  const updateEnityName = (entityId, entityName, index) => {
    const payload = {
      entityID: entityId,
      entityName: entityName,
    }
    api
      .post("/api/UpdateEntityName", payload)
      .then(function (response) {
        // handle success
        if (response && response.data && response.data.Status === "True") {
          let list = [...errors]
          list[index].companyNameError = "Company name already exists"
          setErrors(list)
        } else {
          let list = [...errors]
          list[index].companyNameError = ""
          setErrors(list)
        }
      })
      .catch(function (error) {
        if (error) {
        }
      })
  }

  useEffect(() => {
    if (checkCountShowTrue()) {
      const list = [...fields]
      let currentEntityID =
        entityID &&
        entityID[currentSelectedIndex] &&
        entityID[currentSelectedIndex].entityID
      if (currentEntityID !== undefined && currentEntityID !== "") {
        if (
          list &&
          list[currentSelectedIndex] &&
          list[currentSelectedIndex].category !== ""
        ) {
          list[currentSelectedIndex].entityID = currentEntityID
          setFields(list)
        }
      }
    }
  }, [_entityID, currentSelectedIndex])

  useEffect(() => {
    setCategory(Categories)
    setCompanyTypeInfo(companyType)
    var array = []
    companyType &&
      companyType.map((item) => {
        array.push({ value: item, label: item.EntityTypeDesc })
      })
    setCompanyTypeoInfo(array)

    var array2 = []
    Categories &&
      Categories.map((item) => {
        array2.push({ value: item.Category, label: item.Category })
      })
    setCategoryo(array2)
  }, [Categories, companyType])

  const checkCountShowTrue = () => {
    return fields.some(function (e) {
      return e.countShow === true
    })
  }
  const validateCompanyName = (e, index) => {
    let payload = {
      loginID: e.target.value.trim(),
      pwd: "",
      rememberme: 0,
      loginty: "AdminCompany",
    }
    if (e.target.value != "") {
      // api
      //    .post("/api/availabilityCheck", payload)
      //    .then(function (response) {
      //       // handle success
      //       if (response && response.data && response.data.Status === "True") {
      //          let list = [...errors];
      //          list[index].companyNameError = "Company name alreday exists"
      //          setErrors(list);
      //       } else {
      //          let list = [...errors];
      //          list[index].companyNameError = ""
      //          setErrors(list);
      //          const info = [...fields];
      //          if (checkCountShowTrue()) {
      //             const info = [...fields];
      //             info && info.length > 0 && info.map((data, key) => {
      //                if (key === index && data.countShow === true) {
      //                   updateEnityName(fields && fields[currentSelectedIndex].entityID, fields && fields[currentSelectedIndex].companyName, key);
      //                }
      //             })
      //          }
      //       }
      //    })
      //    .catch(function (error) {
      //       if (error) {

      //       }
      //    });

      const companyNameErr = () => {
        let list = [...errors]
        list[index].companyNameError = ""
        setErrors(list)
        const info = [...fields]
        if (checkCountShowTrue()) {
          const info = [...fields]
          info &&
            info.length > 0 &&
            info.map((data, key) => {
              if (key === index && data.countShow === true) {
                updateEnityName(
                  fields && fields[currentSelectedIndex].entityID,
                  fields && fields[currentSelectedIndex].companyName,
                  key
                )
              }
            })
        }
      }

      if (companyName !== payload.loginID) {
        api
          .post("/api/availabilityCheck", payload)
          .then(function (response) {
            // handle success
            if (response && response.data && response.data.Status === "True") {
              let list = [...errors]
              list[index].companyNameError = "Company name already exists"
              setErrors(list)
            } else {
              companyNameErr()
            }
          })
          .catch(function (error) {
            if (error) {
            }
          })
      } else {
        companyNameErr()
      }
    }
  }

  const onDeletePress = (index) => {
    const licenseIDgrpStr =
      fields &&
      fields[index] &&
      fields[index].liecenseData &&
      fields[index] &&
      fields[index].liecenseData.join(",")
    dispatch(
      companyActions.insertCerificateDetailsRequest({
        licenseSubID: 0,
        entityId: 0,
        userId: userID,
        entityName: fields && fields[index].companyName,
        status: 1,
        licenseIDgrp: licenseIDgrpStr,
        from: "delete",
      })
    )

    let list = [...fields]
    list.splice(index, 1)
    setFields(list)
    setVisible(false)
  }

  const renderDialogBox = (index) => {
    let currentCompanyName = fields && fields[currentSelectedIndex].companyName
    return (
      <Modal
        blockScroll={false}
        classNames={{
          overlayAnimationIn: "",
          overlayAnimationOut: "",
          modalAnimationIn: "",
          modalAnimationOut: "",
          modal: "customModal",
        }}
        open={visible}
        center={true}
        showCloseIcon={false}
        onClose={() => setVisible(false)}
        //modalId="governance"
        styles={{ width: 373, height: 210, overflow: "hidden" }}
        onOverlayClick={() => setVisible(false)}
      >
        <div className="model-design-delete-company">
          <div className="delete-record-title">Delete company record?</div>
          <div className="delete-desc">
            Are you sure you want to delete the record of &nbsp;
            {currentCompanyName}&nbsp;? All selections will be reset.
          </div>
          <div className="last-two-model-btn">
            <button
              onClick={() => setVisible(false)}
              className="btn cancel-delete"
            >
              CANCEL
            </button>
            <button
              onClick={() => onDeletePress(index)}
              className="btn delete-Record"
            >
              DELETE
            </button>
          </div>
        </div>
      </Modal>
    )
  }

  const checkButtonDisabled = () => {
    const list = [...fields]
    let isNext = true
    const errorsObj = [...errors]
    list &&
      list.map((item, index) => {
        errorsObj &&
          errorsObj.map((error, key) => {
            if (
              item.companyName === "" ||
              item.companyType === "" ||
              item.category === "" ||
              item.selectedLiecenseIdArray.length === 0 ||
              error.categoryErr !== "" ||
              error.companyNameError !== ""
            ) {
              isNext = false
              return isNext
            }
          })
      })
    return isNext
  }

  const checkButtonDisabledColor = (key) => {
    const list = [...fields]
    let isNext = true
    list &&
      list.map((item, index) => {
        if (index === key) {
          if (
            item.companyName === "" ||
            item.companyType === "" ||
            item.category === "" ||
            (errors && errors[index] && errors[index].companyNameError != "")
          ) {
            isNext = false
            return isNext
          }
        }
      })
    return isNext
  }

  const onAddLiceseClick = (index) => {
    if (!isMobile) {
      setCurrentSelectedIndex(index)
      setOpen(true)
      const drawerParent = document.getElementById("drawerParent")
      const drawerChild = document.getElementById("drawerChild")
      if (drawerParent) {
        drawerParent.classList.add("overlay")
        drawerChild.style.right = "0px"
      }
      showHideDropDown("companyName", index)
    } else {
      setCurrentSelectedIndex(index)
      setOpen(true)
      const drawerParent = document.getElementById("drawerParentMobile")
      const drawerChild = document.getElementById("drawerChildMobile")
      if (drawerParent) {
        drawerParent.classList.add("overlayAccount")
        drawerChild.style.bottom = "0%"
      }
      showHideDropDown("companyName", index)
    }
  }
  const close = () => {
    if (!isMobile) {
      setCompanyInfo([])
      const drawerParent = document.getElementById("drawerParent")
      const drawerChild = document.getElementById("drawerChild")
      if (drawerParent) {
        drawerParent.classList.remove("overlay")
        drawerChild.style.right = "-100%"
      }
      setIsEditIndex(undefined)
    } else {
      setCompanyInfo([])
      const drawerParent = document.getElementById("drawerParentMobile")
      const drawerChild = document.getElementById("drawerChildMobile")
      if (drawerParent) {
        drawerParent.classList.remove("overlayAccount")
        drawerChild.style.transition = "1.5s linear;"
        drawerChild.style.bottom = "-100%"
      }
      setIsEditIndex(undefined)
    }
  }

  const handleCompanyTypeChange = (value, index, type) => {
    var temp = fields

    if (type == "companyType") {
      temp[index].EntityTypeID = value.EntityTypeID
      temp[index].companyType = value.EntityTypeDesc
    }

    if (type == "categoryType") {
      temp[index].category = value
      temp[index].countShow = false
      temp[index].selectedLiecenseIdArray = []
      temp[index].liecenseCount = 0
      temp[index].liecenseData = []
      temp[index].parentLicense = []
      temp[index].liecenseCount = 0
    }
    setFields(temp)
    handelChange("", index, "", "")
  }

  const generateDropdown = (
    data,
    propertyTOBind,
    dropDownId,
    dropDownType,
    i
  ) => {
    return (
      data &&
      data.map((item, index) => (
        <div
          key={index}
          className="user-list-row"
          // onClick={(e) => {
          //    const list = [...fields];
          //    if (list[i].category === "" || list[i].companyType === "") {
          //       if (e.target.classList.contains("user-list-row")) {
          //          const inputValue = e.target.querySelector(".dropdown-email")
          //             .innerHTML;
          //          const values = [...fields];
          //          values[i][dropDownType] = inputValue;
          //          let companyId = "EntityTypeID"
          //          if (dropDownType === "companyType") {
          //             values[i][companyId] = item.EntityTypeID;
          //          }
          //          setFields(values);
          //          document
          //             .querySelector(`#${dropDownId}`)
          //             .classList.remove("display-none");
          //       }
          //    }
          //    else {
          //       list[i].countShow = false;
          //       list[i].selectedLiecenseIdArray = [];
          //       list[i].liecenseCount = 0;
          //       list[i].liecenseData = [];
          //       list[i].parentLicense = [];
          //       list[i].liecenseCount = 0;
          //       setFields(list);
          //       document
          //          .querySelector(`#${dropDownId}`)
          //          .classList.remove("display-none");

          // }
          // }}
        >
          <div
            className="dropdown-email"
            onClick={(e) => {
              const list = [...fields]
              if (list[i].category === "") {
                if (e.target.classList.contains("dropdown-email")) {
                  const values = [...fields]

                  values[i][dropDownType] = e.target.innerHTML
                  let companyId = "EntityTypeID"
                  if (dropDownType === "companyType") {
                    values[i][companyId] = item.EntityTypeID
                  }

                  setFields(values)
                  document
                    .querySelector(`#${dropDownId}`)
                    .classList.add("display-none")
                }
              } else {
                if (list[i].category !== e.target.innerHTML) {
                  const values = [...fields]
                  values[i][dropDownType] = e.target.innerHTML
                  let companyId = "EntityTypeID"
                  if (dropDownType === "companyType") {
                    values[i][companyId] = item.EntityTypeID
                  }
                  document
                    .querySelector(`#${dropDownId}`)
                    .classList.add("display-none")
                  if (dropDownType !== "companyType") {
                    values[i].countShow = false
                    values[i].selectedLiecenseIdArray = []
                    values[i].liecenseCount = 0
                    values[i].liecenseData = []
                    values[i].parentLicense = []
                    values[i].liecenseCount = 0
                  }
                  setFields(values)
                } else {
                  const values = [...fields]
                  values[i][dropDownType] = e.target.innerHTML
                  let companyId = "EntityTypeID"
                  if (dropDownType === "companyType") {
                    values[i][companyId] = item.EntityTypeID
                  }
                  setFields(values)
                  document
                    .querySelector(`#${dropDownId}`)
                    .classList.add("display-none")
                }
              }
            }}
          >
            {item[propertyTOBind]}
          </div>
          <div className="border-dropdown"></div>
        </div>
      ))
    )
  }

  const showHideDropDown = (type, indexDrop, data) => {
    //  fields.map((ele, index) => {
    //    if (type === "companyType" || type === "companyName") {
    //      document
    //        .querySelector(`#Category-${index}`)
    //        .classList.add("display-none")
    //      setCategoryData(data)
    //      if (index != indexDrop) {
    //        document
    //          .querySelector(`#CompanyType-${index}`)
    //          .classList.add("display-none")
    //      }
    //    }
    //    if (type === "Category" || type === "companyName") {
    //      document
    //        .querySelector(`#CompanyType-${index}`)
    //        .classList.add("display-none")
    //      setCompanyData(data)
    //      if (index != indexDrop) {
    //        document
    //          .querySelector(`#Category-${index}`)
    //          .classList.add("display-none")
    //      }
    //    }
    //  })
  }

  const addNewCompany = (item, index) => {
    return (
      <tr className="focusRemove" key={index}>
        {/* <td className="" style={{ height: "85px" }}> */}
        <td className="">
          <input
            type="text"
            className="form-control border-0 back-color"
            placeholder="Enter Name"
            // defaultValue={index === 0 ? companyName : item.companyName}
            value={item.companyName}
            autoComplete="off"
            name="companyName"
            onFocus={() => {
              showHideDropDown("companyName", index)
            }}
            onBlur={(e) => validateCompanyName(e, index)}
            onChange={(e) => {
              handelChange(e, index, "", "")
            }}
          />
          {errors && errors[index] && errors[index].companyNameError !== "" && (
            <p className="input-error-message" style={{ position: "absolute" }}>
              {errors[index].companyNameError}
            </p>
          )}
        </td>
        <td className="slectCatgory">
          <Searchable
            value={item.companyType}
            className="form-control border-0"
            placeholder={item.companyType ? item.companyType : "Select Type"} // by default "Search"
            notFoundText="No result found" // by default "No result found"
            options={companyTypeoInfo}
            onSelect={(value) => {
              handleCompanyTypeChange(value, index, "companyType")
            }}
            listMaxHeight={200} //by default 140
          />
          {/* <input
            type="text"
            className="form-control border-0"
            placeholder="Select Type"
            name="companyType"
            autoComplete="off"
            value={item.companyType}
            onChange={(e) => {
              handelChange(e, index, item, `CompanyType-${index}`)
            }}
            onFocus={() => {
              document
                .querySelector(`#CompanyType-${index}`)
                .classList.remove("display-none")
              showHideDropDown("companyType", index)
            }}
            onBlur={(e) => {
              // if (
              //    !e.target.classList.contains("user-list-row") ||
              //    !e.target.classList.contains("dropdown-email")
              // ) {

              if (item.companyType && item.companyType != companyData) {
                showHideDropDown("Category", index, item.companyType)
              }
            }}
          />
          <div
            className="dropdown-user-list display-none"
            id={`CompanyType-${index}`}
          >
            {companyTypeInfo &&
              generateDropdown(
                companyTypeInfo,
                "EntityTypeDesc",
                `CompanyType-${index}`,
                "companyType",
                index
              )}
          </div> */}
        </td>
        <td className="dropList slectCatgory ddd">
          <Searchable
            value={item.category}
            className="form-control border-0"
            placeholder={item.category ? item.category : "Select Category"} // by default "Search"
            notFoundText="No result found" // by default "No result found"
            options={categoryo}
            onSelect={(value) => {
              handleCompanyTypeChange(value, index, "categoryType")
            }}
            listMaxHeight={200} //by default 140
          />
          {/* <input
            type="text"
            autoComplete="off"
            className="form-control border-0"
            placeholder="Select Category"
            name="category"
            value={item.category}
            onChange={(e) => {
              handelChange(e, index, "", `Category-${index}`)
            }}
            onFocus={() => {
              document
                .querySelector(`#Category-${index}`)
                .classList.remove("display-none")
              showHideDropDown("Category", index)
            }}
            onBlur={() => {
              // document
              //    .querySelector(`#Category-${index}`)
              //    .classList.add("display-none");
              if (item.category && item.category != categoryData) {
                showHideDropDown("companyType", index, item.category)
              }
            }}
          />
          <div
            className="dropdown-user-list display-none"
            id={`Category-${index}`}
          >
            {category &&
              generateDropdown(
                category,
                "Category",
                `Category-${index}`,
                "category",
                index
              )}
          </div> */}
        </td>
        <td>
          {item.countShow === false && (
            <button
              onClick={() => onAddLiceseClick(index)}
              className={
                checkButtonDisabledColor(index)
                  ? " btn add-license "
                  : "btn add-license-disabled"
              }
              disabled={
                fields[index].companyName === "" ||
                fields[index].companyType === "" ||
                fields[index].category === "" ||
                (errors &&
                  errors[index] &&
                  errors[index].companyNameError !== "")
              }
            >
              add licenses
              <img src={plusIcon} alt="PlusIcon" className="addLicencePlus" />
              <img src={plusIcon2} alt="PlusIcon" className="addLicencePlus2" />
            </button>
          )}
          {item.countShow === true && (
            <div
              onClick={() => onAddLiceseClick(index)}
              className="license-count-selected"
            >
              {item.liecenseCount}
            </div>
          )}
        </td>
        {/* {item.countShow === true && index !== 0 && ( */}
        {fields.length > 1 && (
          <td>
            <div
              onClick={() => {
                Object.values(item).find((item) => item !== "") === false
                  ? onDeletePress(index)
                  : setVisible(true)
                setCurrentSelectedIndex(index)
              }}
              className="delete-icon"
            >
              <img src={deleteBlack} alt="delete Icon" />
            </div>
          </td>
        )}
      </tr>
    )
  }

  const redirectToAssignTaskScreen = () => {
    if (checkButtonDisabled()) {
      history.push("/governance")
    }
  }

  const handelChange = (e, i, item, dropDownId) => {
    const values = [...fields]
    if (e == "") {
      setFields(values)
    }
    if (e != "") {
      const { value, name } = e.target

      //  if (value !== "" && (name === "companyType" || name === "category")) {
      //    document.querySelector(`#${dropDownId}`).classList.remove("display-none")
      //  } else if (
      //    value === "" &&
      //    (name === "companyType" || name === "category")
      //  ) {
      //    document.querySelector(`#${dropDownId}`).classList.add("display-none")
      //  }
      const re = /^(?=.*\S).+$/
      if (
        e.target.value !== "" &&
        !re.test(e.target.value) &&
        name === "companyName"
      ) {
        return ""
      }
      //  if (name === "companyType" && e.target.value !== "") {
      //    let temp = []
      //    companyType &&
      //      companyType.length > 0 &&
      //      companyType.filter((item, index) => {
      //        if (item.EntityTypeDesc.toLowerCase().includes(e.target.value)) {
      //          temp.push(item)
      //        }
      //      })
      //    setCompanyTypeInfo(temp)
      //  } else if (e.target.value === "" && name === "companyType") {
      //    setCompanyInfo(companyType)
      //  }
      //  if (name === "category" && e.target.value !== "") {
      //    let temp = []
      //    Categories &&
      //      Categories.length > 0 &&
      //      Categories.filter((item, index) => {
      //        if (item.Category.toLowerCase().includes(e.target.value)) {
      //          temp.push(item)
      //        }
      //      })
      //    setCategory(temp)
      //  } else if (e.target.value === "" && name === "category") {
      //    setCategory(companyType)
      //  }

      values[i][name] = value
    }
    setFields(values)
  }

  const addEditMobileModel = (item, index) => {
    return (
      <div className="d-block d-sm-none">
        {showEdit && (
          <div className="company-details-mobile">
            <div className="input-box-mobile">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Enter Name"
                value={item.companyName}
                autoComplete="off"
                name="companyName"
                onBlur={(e) => validateCompanyName(e, index)}
                onChange={(e) => {
                  handelChange(e, index, "", "")
                }}
              />
              {errors &&
                errors[index] &&
                errors[index].companyNameError !== "" && (
                  <p
                    style={{ marginBottom: "unset" }}
                    className="input-error-message"
                  >
                    {errors[index].companyNameError}
                  </p>
                )}
            </div>
            <div className="input-box-mobile">
              <Searchable
                value={item.companyType}
                className="form-control border-0"
                placeholder={
                  item.companyType ? item.companyType : "Select Company"
                } // by default "Search"
                notFoundText="No result found" // by default "No result found"
                options={companyTypeoInfo}
                onSelect={(value) => {
                  handleCompanyTypeChange(value, index, "companyType")
                }}
                listMaxHeight={200} //by default 140
              />
              {/* <input
              type="text"
              className="form-control border-0"
              placeholder="Select Type"
              name="companyType"
              autoComplete="off"
              value={item.companyType}
              onChange={(e) => {
                handelChange(e, index, item, `CompanyTypeMobile-${index}`)
              }}
              onFocus={() => {
                document
                  .querySelector(`#CompanyTypeMobile-${index}`)
                  .classList.remove("display-none")
              }}
            />

            <div
              className="dropdown-user-list display-none"
              id={`CompanyTypeMobile-${index}`}
            >
              {companyTypeInfo &&
                generateDropdown(
                  companyTypeInfo,
                  "EntityTypeDesc",
                  `CompanyTypeMobile-${index}`,
                  "companyType",
                  index
                )}
            </div> */}
            </div>
            <div className="input-box-mobile">
              <Searchable
                value={item.category}
                className="form-control border-0"
                placeholder={item.category ? item.category : "Select Category"} // by default "Search"
                notFoundText="No result found" // by default "No result found"
                options={categoryo}
                onSelect={(value) => {
                  handleCompanyTypeChange(value, index, "categoryType")
                }}
                listMaxHeight={200} //by default 140
              />
              {/* <input
              type="text"
              autoComplete="off"
              className="form-control border-0"
              placeholder="Select Category"
              name="category"
              value={item.category}
              onChange={(e) => {
                handelChange(e, index, "", `CategoryMobile-${index}`)
              }}
              onFocus={() => {
                document
                  .querySelector(`#CategoryMobile-${index}`)
                  .classList.remove("display-none")
              }}
            />
            <div
              className="dropdown-user-list display-none"
              id={`CategoryMobile-${index}`}
            >
              {category &&
                generateDropdown(
                  category,
                  "Category",
                  `CategoryMobile-${index}`,
                  "category",
                  index
                )}
            </div> */}
            </div>
            <div className="input-box-mobile">
              {item.countShow ? (
                <div className="flex">
                  <div
                    className="liences-mobile"
                    style={{ marginTop: 10, marginRight: 5 }}
                  >
                    Licenses:
                  </div>
                  <div
                    onClick={() => onAddLiceseClick(index)}
                    className="license-count-selected"
                  >
                    {item.liecenseCount}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => onAddLiceseClick(index)}
                  className={
                    checkButtonDisabledColor(index)
                      ? " btn add-license-mobile "
                      : "btn add-license-mobile-disabled"
                  }
                  disabled={
                    fields[index].companyName === "" ||
                    fields[index].companyType === "" ||
                    fields[index].category === "" ||
                    (errors &&
                      errors[index] &&
                      errors[index].companyNameError !== "")
                  }
                >
                  add licenses
                  {fields[index].companyName === "" ||
                  fields[index].companyType === "" ||
                  fields[index].category === "" ||
                  (errors &&
                    errors[index] &&
                    errors[index].companyNameError !== "") ? (
                    <img src={grayPlusIcon} alt="grayPlusIcon" />
                  ) : (
                    <img
                      src={plusIcon2}
                      alt="PlusIcon"
                      className="addLicencePlus2"
                    />
                  )}
                </button>
              )}
              {item.countShow && isEditIndex != undefined && (
                <div class=".co-personal-grid">
                  <div class="row align-right">
                    <div class="col-12 col-sm-12 col-md-12 col-xl-12 flex">
                      <div
                        class="cancel-button-mobile-view"
                        onClick={() => setshowEdit(false)}
                      >
                        Cancel
                      </div>
                      <button
                        className={"save-button-mobile-view"}
                        onClick={() => setshowEdit(false)}
                        //disabled = {item.Category!== "" && item.EntityName!=="" && item.coUserID !== undefined && item.EntityTypeID != 0 && item.selectedLicenseArray.length != 0   ? false : true}
                      >
                        save
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {index != 0 && (
                <div style={{ float: "right", padding: 5 }}>
                  <div
                    className="delete-icon"
                    onClick={() => {
                      setVisible(true)
                      setCurrentSelectedIndex(index)
                    }}
                  >
                    <img
                      className="delete-icon"
                      src={deleteIcon}
                      alt="delete Icon"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
  const addNewCompanymobile = (item, index) => {
    if (
      item.companyType === "" ||
      item.category == "" ||
      item.liecenseCount === null ||
      item.countShow === false
    ) {
      return <>{addEditMobileModel(item, index)}</>
    } else {
      return (
        <>
          <div className="d-block d-sm-none">
            <div className="company-details-filled-mobile">
              <div className="d-flex">
                <div className="col-10 pl-0">
                  <div className="bk-seq-title">{item.companyName}</div>
                </div>
                <div className="col-2 pr-0">
                  <div className="license-count-selected-mobile">
                    {item.liecenseCount}
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-10 pl-0">
                  <div className="firm-name-mobile">{item.category}</div>
                  <div className="firm-name-mobile">{item.companyType}</div>
                </div>
                <div className="col-2 pr-0">
                  <div className="edit-delete">
                    <div
                      className="col-6 pl-0"
                      onClick={() =>
                        isEditIndex === undefined ? setIsEditIndex(index) : null
                      }
                    >
                      <div
                        className="mobile-edit"
                        onClick={() => setshowEdit(true)}
                      >
                        edit
                      </div>
                    </div>
                    {fields.length > 1 && (
                      <div className="col-6 ml-1">
                        <div
                          className="delete-icon"
                          onClick={() => {
                            setVisible(true)
                            setCurrentSelectedIndex(index)
                          }}
                        >
                          <img
                            className="delete-icon"
                            src={whiteDeleteIcon}
                            alt="delete Icon"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isEditIndex === index && addEditMobileModel(item, index)}
        </>
      )
    }
  }

  return (
    <div className="row get-mobile-company-detail">
      {visible && renderDialogBox(currentSelectedIndex)}
      <div className="col-3 left-fixed">
        <div className="on-boarding">
          {/* <SideBar /> */}
          <SideBarInputControl currentStep={2} />
        </div>
      </div>
      <div className="col-12 padding-right">
        <img
          className="bottom-right-bg"
          src={RightImageBg}
          alt="RightImageBg"
        />
        <div className="get-main-company-detail">
          {!isMobile && (
            <div id="drawerParent" className="">
              <div id="drawerChild" className="sideBarFixed">
                {open && (
                  <LicenseDrawer
                    currentSelectedIndex={currentSelectedIndex}
                    setCurrentSelectedIndex={setCurrentSelectedIndex}
                    fields={fields}
                    setFields={setFields}
                    setLiecenseData={setLiecenseData}
                    liecenseData={liecenseData}
                    category={category}
                    companyInfo={companyInfo}
                    setCategory={setCategory}
                    close={close}
                    setCompanyInfo={setCompanyInfo}
                  />
                )}
              </div>
            </div>
          )}
          {isMobile && (
            <div id="drawerParentMobile" className="">
              <div id="drawerChildMobile" className="sideBarFixedAccount">
                {open && (
                  <LicenseDrawer
                    currentSelectedIndex={currentSelectedIndex}
                    setCurrentSelectedIndex={setCurrentSelectedIndex}
                    fields={fields}
                    setFields={setFields}
                    setLiecenseData={setLiecenseData}
                    liecenseData={liecenseData}
                    category={category}
                    companyInfo={companyInfo}
                    setCategory={setCategory}
                    close={close}
                    setCompanyInfo={setCompanyInfo}
                  />
                )}
              </div>
            </div>
          )}
          <div className="container">
            <div className="get-started-header">
              <div className="row">
                <div className="col-lg-12">
                  <div className="header_logo">
                    {/* <a href="#" style={{'cursor': 'auto'}}> */}
                    <img src={comtech} alt="COMPLIANCE SUTRA" title="COMPLIANCE SUTRA" />
                    <span className="camp">COMPLIANCE SUTRA</span>
                    {/* </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block d-sm-none">
              <MobileStepper currentStep={2} />
            </div>

            <div className="company-details">
              <p className="company-title">
                {" "}
                {/* <img src={leftArrow} alt="" />  */}
                Give us your company details
              </p>
            </div>
            <div className="bottom-logo-strip-parent-grid d-block d-sm-none">
              {fields &&
                fields.map((item, index) => addNewCompanymobile(item, index))}
              {/* <div className="d-block d-sm-none">
                        <div className="company-details-filled-mobile">
                           <div className="d-flex">
                              <div className="col-10 pl-0">
                                 <div className="bk-seq-title">B&K Securities</div>
                              </div>
                              <div className="col-2 pr-0">
                                 <div className="license-count-selected-mobile">5</div>
                              </div>
                           </div>
                           <div className="d-flex">
                              <div className="col-10 pl-0">
                                 <div className="firm-name-mobile">Partnership Firm</div>
                                 <div className="firm-name-mobile">Insurance</div>
                              </div>
                              <div className="col-2 pr-0">
                                 <div className="mobile-edit">edit</div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="d-block d-sm-none">
                        <div className="company-details-filled-mobile">
                           <div className="d-flex">
                              <div className="col-10 pl-0">
                                 <div className="bk-seq-title">B&K Securities</div>
                              </div>
                              <div className="col-2 pr-0">
                                 <div className="license-count-selected-mobile">4</div>
                              </div>
                           </div>
                           <div className="d-flex">
                              <div className="col-10 pl-0">
                                 <div className="firm-name-mobile">Partnership Firm</div>
                                 <div className="firm-name-mobile">Insurance</div>
                              </div>
                              <div className="col-2 pr-0">
                                 <div className="edit-delete">
                                    <div className="col-6 pl-0">
                                       <div className="mobile-edit">edit</div>
                                    </div>
                                    <div className="col-6 ml-1">
                                       <div className="delete-icon">
                                          <img className="delete-icon" src={deleteIcon} alt="delete Icon" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="d-block d-sm-none">
                        <div className="company-details-mobile">
                           <div className="input-box-mobile">
                              <input
                                 type="text"
                                 className="form-control border-0"
                                 placeholder="Company Name"
                                 value="" name="companyName" />
                           </div>
                           <div className="input-box-mobile">
                              <input
                                 type="text"
                                 className="form-control border-0"
                                 placeholder="Company Type"
                                 name="companyType"
                                 value="" />
                           </div>
                           <div className="input-box-mobile">
                              <input type="text"
                                 className="form-control border-0"
                                 placeholder="Category"
                                 name="category"
                                 value="" />
                              <div className="dropdown-user-list display-none">
                              </div>
                           </div>
                           <div className="input-box-mobile">
                              <button className="btn add-license-mobile">
                                 add licenses <img src={grayPlusIcon} alt="Plus Icon" />
                              </button>
                           </div>

                        </div>
                     </div> */}
              <div className="d-block d-sm-none">
                <div className="container">
                  <div className="add-company-mobile">
                    <caption
                      onClick={() => {
                        const values = [...fields]
                        values.push({
                          companyName: "",
                          companyType: "",
                          category: "",
                          countShow: false,
                          selectedLiecenseIdArray: [],
                        })
                        setFields(values)
                        const errorInfo = [...errors]
                        errorInfo.push({
                          companyNameError: "",
                          companyTypeError: "",
                          categoryErr: "",
                        })
                        setErrors(errorInfo)
                      }}
                      className="add-company-link"
                    >
                      Add another company
                    </caption>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom-logo-strip-parent-grid table-responsive">
              <table className="companyDetailsGrid table company-details-tbl d-none d-sm-block">
                <caption
                  style={{ width: "fit-content" }}
                  onClick={() => {
                    const values = [...fields]
                    values.push({
                      companyName: "",
                      companyType: "",
                      entityID: "",
                      EntityTypeID: "",
                      category: "",
                      countShow: false,
                      selectedLiecenseIdArray: [],
                    })
                    setFields(values)
                    const errorInfo = [...errors]
                    errorInfo.push({
                      companyNameError: "",
                      companyTypeError: "",
                      categoryErr: "",
                    })
                    setErrors(errorInfo)
                  }}
                  className="add-company-link"
                >
                  Add another company
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Company Name</th>
                    <th scope="col">Company Type</th>
                    <th scope="col">Business category</th>
                    <th scope="col">Licenses</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((item, index) => addNewCompany(item, index))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="container">
            <div className="bottom-logo-strip">
              <div className="row aligncenter">
                <div className="col-12">
                  <button
                    disabled={checkButtonDisabled() === true ? false : true}
                    className={
                      checkButtonDisabled() === true
                        ? "btn mb-2 save-details common-button-next"
                        : "btn mb-2 save-details common-button-next-disabled"
                    }
                    onClick={() => redirectToAssignTaskScreen()}
                    style={{
                      backgroundColor:
                        checkButtonDisabled() === true ? "#6c5dd3" : "#e4e4e4",
                      color: checkButtonDisabled() !== true && "#aeaeae",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="row aligncenter">
                {/* <div className="col-md-6 col-xs-12">
                           <p className="account-link">
                              *For companies requiring compliance in{" "}
                              <img className="header_logo" src={india} alt="" /> INDIA
                  </p>
                        </div> */}
                <div className="col-md-12 col-xs-12 d-none d-sm-block text-right">
                  {/* <a href="#" style={{'cursor': 'auto'}}> */}
                  <span className="powerBy">Powered by</span>
                  <img
                    className="header_logo footer-logo-secmark"
                    src={secmark}
                    alt="SECMARK"
                    title="SECMARK"
                  />
                  {/* </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  )
}

export default withRouter(CompanyDetails)
