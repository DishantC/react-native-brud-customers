export default class Api {
  // static baseUrl = 'https://brud-new-1.herokuapp.com/api/';
  static baseUrl= 'http://54.177.165.108:3000/api/';
}

export const RegisterApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Accept', 'application/json');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'user/signup', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const LoginApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Accept', 'application/json');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'user/login', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const VerifyOtp = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Accept', 'application/json');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'user/otp-check', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const resendOtp = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'user/resend-otp', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const resetPassword = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'user/reset-password', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const cafeListApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'user/cafe-list', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const cafeDetailsApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'restaurant/cafe-details', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const itemListApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'items/list', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const itemDetailsApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'items/item-details', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const changePasswordApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'user/change-password', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};


export const AddCartApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'cart/add', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const ListCartApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'cart/list', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const UpdateCartApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'cart/quantity-update', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const RemoveCartItemApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'cart/item-remove', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const PlaceOrderApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'order/order-place', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const GetOrdersApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'user/my-order', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};


export const PostReorder = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'order/re-order-place', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};


export const trackOrderApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'order/track-order', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};


export const GetStatusList = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'status/list', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const AddCardApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'card/add', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const EditCardApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'card/edit', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const UpdateCardApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'card/update', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const DeleteCardApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'card/delete', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const CardListApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'card/list', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};


export const DefaultCardApi = async RequestData => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: RequestData,
      redirect: 'follow',
    };
    fetch(Api.baseUrl + 'card/default-select-card', requestOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};


export const orderCategoryApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'category/list', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};


export const customerProfileGetApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'user/get-profile', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const UploadImage = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(Api.baseUrl+'user/profile-img', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};


export const updateProfileApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'user/update-profile', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};


export const onCardPointApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'loyalty_point/list', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const onRewardHistoryApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'loyalty_point/reward-history', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const onNotificationApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'notifications/list', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const onBannerListApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'banners/list', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const onDealListApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'deals/list', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};


export const onRatingApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'rating/add', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};


export const GetRatingListApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'rating/list', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};

export const GetHomeListApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'user/home', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};


export const forgotPasswordApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'user/forgot-password', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};



export const DeleteCartItemApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'cart/cart-delete', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};


export const onItemListApi = async (formdata) => {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

   await fetch(Api.baseUrl+'items/category-items-list', requestOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};