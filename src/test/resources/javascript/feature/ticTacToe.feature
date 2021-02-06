Feature: Ability To Play Tic Tac Toe

Scenario: A user needs the ablity to place game pieces on a board
	When User places an 'x' on the 'Top Left' place
	And User places an 'o' on the 'Middle Middle' place
	Then 'Top Left' should have an 'x'
	And 'Middle Middle' should have an 'o'
	And Board should register 2 moves total

Scenario: Board should notify user when they place an item on a non empty place
	Given User places an 'x' on the 'Top Left' place
	When User places an 'o' on the 'Top Left' place
	Then User should be informed that 'x' was already placed on the 'Top Left' place
	And Board should register 1 moves total

Scenario Outline: As a user I would like to know whose turn it is
	Given <intMoves> moves on board
	When I ask whose turn it is
	Then Game should tell me it is '<playerName>' turn

Examples:
	| intMoves 	| playerName 	|
	| 0		| X		|
	| 1		| O		|
	| 2		| X		|
	| 3		| O		|
	| 4		| X		|
	| 5		| O		|
	| 6		| X		|
	| 7		| O		|
	| 8		| X		|
	| 9		| O		|

Scenario Outline: As a user I would like to know if a player is real or the computer
	Given '<playerName1>' is '<playerType1>'
	And '<playerName2>' is '<playerType2>'
	When I ask what '<playerName1>' is
	And I ask what '<playerName2>' is
	Then Game should tell me that '<playerName1>' is '<playerType1>'
	And Game should tell me that '<playerName2>' is '<playerType2>'

Examples:
	| playerName1 	| playerType1	| playerName2	| playerType2 	|
	| X		| real		| O		| computer	|
	| X		| computer	| O		| real		|
	| X		| real		| O		| real		|
	| X		| computer	| O		| computer	|
