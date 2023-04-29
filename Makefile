build:
	docker build -t chat-gpt-tg-bot .

run:
	docker run -d -p 3000:3000 --name chat-gpt-tg-bot --rm chat-gpt-tg-bot