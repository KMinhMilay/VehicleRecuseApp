import * as RequestModel from './Model/RequestModel';

export const addRequest = async (is_bookmarked_by_user, is_bookmarked_by_engineer, show_on_user, show_on_engineer) => {
    try {
      await RequestModel.addRequest(is_bookmarked_by_user, is_bookmarked_by_engineer, show_on_user, show_on_engineer);
      console.log('Yêu cầu được thêm thành công');
    } catch (error) {
      console.error('Có lỗi khi thêm yêu cầu: ', error);
    }
  };