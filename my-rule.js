"use strict";

const astUtils = require("../util/ast-utils");

module.exports = {
	meta: {
		type: "layout",
		schema: [],
		fixable: "whitespace"
	},

	create(context) {
		const sourceCode = context.getSourceCode();
		return {
			BlockStatement: function (node) {
				const precedingToken = sourceCode.getTokenBefore(node);

				if (precedingToken && astUtils.isTokenOnSameLine(precedingToken, node)) {
					const hasSpace = sourceCode.isSpaceBetweenTokens(precedingToken, node);
					const parent = context.getAncestors().pop();

					if ((parent.type === "FunctionExpression" || parent.type === "FunctionDeclaration") && !hasSpace) {
						context.report({
							node,
							message: "Missing space before opening brace.",
							fix(fixer) {
								return fixer.insertTextBefore(node, " ");
							}
						});
					}
				}
			},
			ArrowFunctionExpression: function (node) {
				const functionVariables = context.getDeclaredVariables(node);
				if (functionVariables.length > 1) {
					for (let i = 0; i < functionVariables.length - 1; i++) {
						const comma = sourceCode.getTokenAfter(functionVariables[i].identifiers.pop());
						const nextVariable = sourceCode.getTokenAfter(comma);

						if (!sourceCode.isSpaceBetweenTokens(comma, nextVariable)) {
							context.report({
								node,
								message: "No space between arguments",
								fix(fixer) {
									return fixer.insertTextAfter(comma, " ");
								}
							});
						}
					}
				}
			}
		};
	}
}
