import requests

# print the response text (the summary)
# response = requests.post('http://localhost:5000/summarize',
#                             json={'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus ullamcorper volutpat. Sed blandit ligula ac interdum vulputate. Nulla vel orci congue, vehicula sapien at, iaculis ligula. Ut condimentum pharetra massa, non scelerisque arcu consectetur sit amet. In dignissim efficitur leo a convallis. Fusce placerat ac erat vitae imperdiet. Fusce in facilisis ante, in venenatis magna. Vestibulum ante felis, facilisis quis ex vitae, eleifend tempus sem. Curabitur eu felis vitae odio mollis pharetra at sit amet lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. In dignissim nisl nibh, non faucibus augue iaculis eget. In auctor iaculis leo ac facilisis. Maecenas commodo porttitor diam in imperdiet.'})
# print(response.text)

response = requests.post('http://localhost:5000/summarize_infer',
                            json={'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus ullamcorper volutpat. Sed blandit ligula ac interdum vulputate. Nulla vel orci congue, vehicula sapien at, iaculis ligula. Ut condimentum pharetra massa, non scelerisque arcu consectetur sit amet. In dignissim efficitur leo a convallis. Fusce placerat ac erat vitae imperdiet. Fusce in facilisis ante, in venenatis magna. Vestibulum ante felis, facilisis quis ex vitae, eleifend tempus sem. Curabitur eu felis vitae odio mollis pharetra at sit amet lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. In dignissim nisl nibh, non faucibus augue iaculis eget. In auctor iaculis leo ac facilisis. Maecenas commodo porttitor diam in imperdiet.'})
print(response.text)
