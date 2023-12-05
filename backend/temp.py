import requests
import json

# print the response text (the summary)
# response = requests.post('http://localhost:5000/api/upload_text',
#                             json={'username': '',
#                                   'content': 'Rối loạn tăng động giảm chú ý (Attention Deficit Hyperactivity Disorder, viết tắt là ADHD),  là một rối loạn phát triển thần kinh ảnh hưởng đến chức năng điều hành của não, làm gián đoạn quá trình hoàn thành công việc, theo dõi hướng dẫn và tập trung vào các chi tiết. Các triệu chứng hành vi mạnh nhất của ADHD ở người lớn thường biểu hiện dưới dạng thiếu tập trung vào giờ giấc và giao tiếp một cách bốc đồng (gián đoạn nhiều lần).',
#                                   })
# response = requests.get('http://localhost:5000/api/get_content',
#                         json={'username': ''}
#                         )
# print(response.text)

# docx_file = open('sample files/sample.docx', 'rb')
# response = requests.post('http://localhost:5000/api/upload_file',
#                             files={'file': docx_file},
#                             json={'username': ''}
#                             )
# print(response.text)

response = requests.get('http://localhost:5000/api/get_content',
                         json={'username': ''}
                         )
print(response.text)
