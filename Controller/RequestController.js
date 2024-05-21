import * as RequestModel from '../Model/RequestModel';

export const addRequest = async (is_bookmarked_by_user, is_bookmarked_by_engineer, show_on_user, show_on_engineer,
  vehicle_id, customer_id, engineer_id, longitude, latitude, status, notes, create_at) => {
  try {
    await RequestModel.addRequest(is_bookmarked_by_user, is_bookmarked_by_engineer, show_on_user, show_on_engineer,
      vehicle_id, customer_id, engineer_id, longitude, latitude, status, notes, create_at);
    console.log('Yêu cầu được thêm thành công');
  } catch (error) {
    console.error('Có lỗi khi thêm yêu cầu: ', error);
  }
};

export const getRequestByIdUser = async (idUser) => {
  try {
    const listRequests = await RequestModel.getRequestByIdUser(idUser);
    console.log('Lấy danh sách yêu cầu theo id thành công');
    return listRequests;
  } catch (error) {
    console.error('Có lỗi khi lấy yêu cầu:', error);
  }
}

export const updateBookmarkRequestCustomer = async (id, bookmark) => {
  try {
    await RequestModel.updateBookmarkRequestCustomer(id, bookmark);
    console.log('Cập nhật bookmark yêu cầu thành công');
  } catch (error) {
    console.error('Có lỗi khi cập nhật bookmark yêu cầu:', error);
  }
}

export const getRequestById = async (idRequest) => {
  try {
    const listRequests = await RequestModel.getRequestById(idRequest);
    console.log('Lấy thông tin yêu cầu theo id thành công');
    return listRequests;
  } catch (error) {
    console.error('Có lỗi khi lấy thông tin:', error);
  }
}


export const getRequestFilter = async (idUser, dateFilter, vehicleFilter, orderingType) => {
  try {
    let query = "SELECT Requests.id, is_bookmarked_by_engineer, is_bookmarked_by_user, show_on_engineer, vehicle_name, customer_id, longitude, latitude, status, strftime('%d-%m-%Y', create_at) as create_at, engineer_id, notes from Requests INNER JOIN Vehicles on Requests.vehicle_id = Vehicles.id WHERE"
    let params = []

    query += " (customer_id = ? OR"
    params.push(idUser)
    query += " engineer_id = ?)"
    params.push(idUser)

    if (dateFilter) {
      query += " AND create_at = ?"
      params.push(dateFilter);
    }
    if (vehicleFilter) {
      query += " AND vehicle_name = ?"
      params.push(vehicleFilter);
    }

    if (orderingType === 'byDate') {
      query += " ORDER by create_at DESC";
    } else if (orderingType === 'byStatus') {
      query += ` ORDER BY 
        CASE status
          WHEN 'Đang đợi thợ' THEN 1
          WHEN 'Đã hủy' THEN 2
          WHEN 'Đang thực hiện' THEN 3
          WHEN 'Đã hoàn thành' THEN 4
        END`;
    }

    console.log(query, params);

    const results = await RequestModel.getRequestFilter(query, params);

    const data = [];
    for (let i = 0; i < results.rows.length; i++) {
      const item = results.rows.item(i);
      if (item.show_on_engineer || item.show_on_user) {
        data.push(item);
      }
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};