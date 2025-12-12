port=3000
while true; do
  { 
    read line
    # simple routing: only respond once per request
    printf "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nHello from Bash on port %s\n" "$port"
  } < /dev/tcp/0.0.0.0/$port
done