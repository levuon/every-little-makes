
CC = gcc

welcome:
	@printf "\033[36m             _                           \n"
	@printf "\033[36m    ___ __ _| |_   _ _ __  ___  ___      \n"
	@printf "\033[36m   / __/ _\` | | | | | '_ \/ __|/ _ \\   \n"
	@printf "\033[36m  | (_| (_| | | |_| | |_) \__ \ (_) |    \n"
	@printf "\033[36m   \___\__,_|_|\__, | .__/|___/\___/     \n"
	@printf "\033[36m               |___/|_|                  \n"
	@printf "\033[m\n"

run: welcome install

show:
	echo $PID $NODE_BIN


install:
	@yarn install
