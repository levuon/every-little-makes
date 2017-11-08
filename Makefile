
$shPath: ''

welcome:
	@printf "\033[36m     \n"
	@printf "\033[36m     \n"
	@printf "\033[36m     \n"
	@printf "\033[36m     \n"
	@printf "\033[36m     \n"
	@printf "\033[36m     \n"
	@printf "\033[m\n"

run: welcome install clean

show:
	echo $PID $NODE_BIN


install:
	@yarn install


clean:
	@rm -rf ./built

  